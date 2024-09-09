# Copyright (c) HashiCorp, Inc.

variable "test" {
  type = object({
    test_object = map( # here
      object({ # here
        test_map = string
      })
    )
  })
}