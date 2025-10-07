data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
}

# Security Group
resource "aws_security_group" "amsa_sg" {
  name        = "amsa-sg"
  description = "Allow SSH, HTTP and backend API (3001)"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.ssh_cidr]
  }

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Backend API"
    from_port   = 3001
    to_port     = 3001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "amsa-sg"
  }
}

# IAM role & instance profile for CloudWatch Agent & SSM
resource "aws_iam_role" "ec2_role" {
  name = "amsa-ec2-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "cw_attach" {
  role       = aws_iam_role.ec2_role.name
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy"
}

resource "aws_iam_role_policy_attachment" "ssm_attach" {
  role       = aws_iam_role.ec2_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_instance_profile" "ec2_profile" {
  name = "amsa-instance-profile"
  role = aws_iam_role.ec2_role.name
}

# SNS topic + subscription (email)
resource "aws_sns_topic" "amsa_topic" {
  name = "AmsaMonitoringAlerts"
}

resource "aws_sns_topic_subscription" "email_sub" {
  topic_arn = aws_sns_topic.amsa_topic.arn
  protocol  = "email"
  endpoint  = var.sns_email
}

# EC2 instance
resource "aws_instance" "amsa_ec2" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.instance_type
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.amsa_sg.id]
  iam_instance_profile   = aws_iam_instance_profile.ec2_profile.name

  tags = {
    Name = "Amsa-EC2-Instance"
  }

  user_data = file("${path.module}/scripts/user_data.sh")
}

# CloudWatch alarms
resource "aws_cloudwatch_metric_alarm" "cpu_high" {
  alarm_name          = "Amsa-CPU-High"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 1
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = 300
  statistic           = "Average"
  threshold           = 80
  alarm_actions       = [aws_sns_topic.amsa_topic.arn]
  dimensions = {
    InstanceId = aws_instance.amsa_ec2.id
  }
}

resource "aws_cloudwatch_metric_alarm" "mem_high" {
  alarm_name          = "Amsa-Memory-High"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 1
  metric_name         = "mem_used_percent"
  namespace           = "CWAgent"
  period              = 300
  statistic           = "Average"
  threshold           = 75
  alarm_actions       = [aws_sns_topic.amsa_topic.arn]
  dimensions = {
    InstanceId = aws_instance.amsa_ec2.id
  }
}

resource "aws_cloudwatch_metric_alarm" "disk_high" {
  alarm_name          = "Amsa-Disk-High"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 1
  metric_name         = "disk_used_percent"
  namespace           = "CWAgent"
  period              = 300
  statistic           = "Average"
  threshold           = 80
  alarm_actions       = [aws_sns_topic.amsa_topic.arn]
  dimensions = {
    InstanceId = aws_instance.amsa_ec2.id
    path       = "/"
  }
}

# Dashboard built from template
resource "aws_cloudwatch_dashboard" "amsa_dashboard" {
  dashboard_name = var.dashboard_name
  dashboard_body = templatefile("${path.module}/templates/dashboard.json.tpl", {
    instance_id = aws_instance.amsa_ec2.id,
    region      = var.region
  })
}
