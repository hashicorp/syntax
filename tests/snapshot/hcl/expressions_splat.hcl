attr = [for o in var.list : o.id]

attr = var.list[*].id

attr = var.list[*].interfaces[0].name
