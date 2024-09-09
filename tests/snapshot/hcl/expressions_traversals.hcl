# Copyright (c) HashiCorp, Inc.

attr = var.test
attr = var.test42
attr = var.test42test
attr = var.test-test
attr = var.test_test
attr = traversal

# numeric index
attr = var.test[42]
attr = var.test[42][32]
attr = var.test[42].test

# string index
attr = var.test["key"]
attr = var.test["key"]["two"]
attr = var.test["key"].test

# legacy numeric index
attr = var.test.42
attr = var.test.42.32
attr = var.test.42.test

# incomplete expression with trailing multiplication operator
attr = var.list*

# ensure this is multiplication and not splat
attr = var.li*st

# invalid attribute accessor
attr = var.42test
