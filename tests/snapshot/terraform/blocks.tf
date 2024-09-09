# Copyright (c) HashiCorp, Inc.

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
// duplicated here to ensure compatibility with generic HCL
post-processor "foo" {}

// dash is not expected at the beginning
-test "foo" {}

// all Unicode word characters are accepted
žblock "foo" {}
bžlock "foo" {}
