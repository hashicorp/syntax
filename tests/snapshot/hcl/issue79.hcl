block {
    attr = var.test
    attr2 = var.test == "foo" ? "true" : "false"
    nested_obj = {
        attr = var.test
        attr2 = var.test == "foo" ? "true" : "false"
    }
}