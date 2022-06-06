// terraform type block
resource "aws_instance" "web" {
  ami           = "ami-a1b2c3d4"
  instance_type = "t2.micro"
  timeouts {
    create = "60m"
    delete = "2h"
  }
}

// packer type block
// As per https://github.com/hashicorp/hcl/blob/main/hclsyntax/spec.md#identifiers
// a `-` is allowed in the identifier.
post-processor "foo" {}

// dash is not expected at the beginning
-test "foo" {}

// digits are not expected at the beginning
42test "foo" {}

// digits are allowed in 2nd+ positions
test42 "foo" {}
