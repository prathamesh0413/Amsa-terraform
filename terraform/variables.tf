variable "region" {
  description = "AWS region"
  type        = string
  default     = "ap-south-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "key_name" {
  description = "EC2 KeyPair name (must exist)"
  type        = string
}

variable "ssh_cidr" {
  description = "CIDR allowed to SSH (use x.x.x.x/32 for your IP)"
  type        = string
  default     = "0.0.0.0/0"
}

variable "sns_email" {
  description = "Email to subscribe to SNS alerts (you will need to confirm)"
  type        = string
}

variable "dashboard_name" {
  description = "CloudWatch dashboard name"
  type        = string
  default     = "AmsaMonitoringDashboard"
}
