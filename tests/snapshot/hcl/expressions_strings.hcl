# Copyright (c) HashiCorp, Inc.

attr = "hello"

attr = "\n\r\t\"\\"

attr = "$${}"

attr = "%%{}"

thing = <<EOT
hello
world
EOT

block {
  value = <<EOT
hello
world
EOT
}

block {
  value = <<-EOT
  hello
    world
  EOT
}

attr = "Hello, ${var.name}!"

attr = "Hello, %{ if var.name != "" }${var.name}%{ else }unnamed%{ endif }!"

attr = <<EOT
%{ for ip in aws_instance.example.*.private_ip }
server ${ip}
%{ endfor }
EOT

attr = <<EOT
%{ for ip in aws_instance.example.*.private_ip ~}
server ${ip}
%{ endfor ~}
EOT

attr = "abc${var.name.multi.step.addr}"

attr = "abc${var.name.test.0.foo}"

attr = "abc${var.name.test.0}"
