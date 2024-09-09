# Copyright (c) HashiCorp, Inc.

attr = [for o in var.list : o.id]

attr = var.list[*].id

attr = var.list[*].interfaces[0].name

attr = var.list.*.id

attr = "${var.list.*.id}"

attr = "${var.list.*}"

attr = var.list.*
