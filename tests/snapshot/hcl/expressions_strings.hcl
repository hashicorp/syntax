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


