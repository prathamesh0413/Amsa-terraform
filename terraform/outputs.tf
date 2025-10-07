output "public_ip" {
  description = "EC2 public IP"
  value       = aws_instance.amsa_ec2.public_ip
}

output "public_dns" {
  description = "EC2 public DNS"
  value       = aws_instance.amsa_ec2.public_dns
}

output "sns_topic_arn" {
  description = "SNS Topic ARN for alarms"
  value       = aws_sns_topic.amsa_topic.arn
}
