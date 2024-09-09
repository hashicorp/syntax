# Copyright (c) HashiCorp, Inc.

resource "aws_instance" "web" {
  // The trailing { can confuse the regex into thinking it's a block
  type = list(object({
    internal = number
    external = number
    protocol = string
  }))

// The trailing { can confuse the regex into thinking it's a block
  default = [{
      internal = 8300
      external = 8300
      protocol = "tcp"
    }
  ]

  # This is a nested block and should highlight correctly
  nested-resource "aws_instance" "foo" {
    type = "nested"
  }
}
