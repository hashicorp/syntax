// Modify vpc, subnets and security group data
data "terraform_remote_state" "vpc" {
  backend = "s3"

  config = {
    bucket = var.backend_bucket
    key    = "${var.vpc_tf_state_key}/terraform.tfstate"
    region = var.backend_region
  }
}

data "aws_ssm_parameter" "dev_db_username" {
  name = "/testoapp/dev_db_username"
}

data "aws_ssm_parameter" "dev_db_password" {
  name = "/testapp/dev_db_password"
}

locals {
  // Remove `Name` tag from the map of tags because Elastic Beanstalk generates the `Name` tag automatically
  // and if it is provided, terraform tries to recreate the application on each `plan/apply`
  // `Namespace` should be removed as well since any string that contains `Name` forces recreation
  // https://github.com/terraform-providers/terraform-provider-aws/issues/3963

  name_prefix = "${var.name}${var.delimiter}${var.environment}${var.delimiter}${var.namespace}"
  tags = merge(
    map("Environment", var.environment),
    map("DeployedBy", "terraform"),
    map("Namespace", var.namespace),
    var.tags
  )
}
