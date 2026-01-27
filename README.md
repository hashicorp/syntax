# HashiCorp Syntax


TextMate grammars for highlighting configuration used by HashiCorp software, primarily [HCL (HashiCorp Configuration Language)](https://github.com/hashicorp/hcl) and HCL-based languages.

## How do I use this?

### As end-user

Generally you should never need to interact with this repository directly.

Instead you can use the grammar through editors, editor extensions, or highlighting libraries which in turn may use this repository, for example:

 - [Terraform VS Code Extension](https://marketplace.visualstudio.com/items?itemName=HashiCorp.terraform)
 - [HCL VS Code Extension](https://marketplace.visualstudio.com/items?itemName=HashiCorp.HCL)
 - [Sentinel VS Code Extension](https://marketplace.visualstudio.com/items?itemName=HashiCorp.sentinel)

### As maintainer enabling end-users

If your editor or other syntax highlighting engine supports TextMate, you can introduce a build-time dependency along these lines:

```sh
VERSION=0.1.0
URL="https://github.com/hashicorp/syntax/raw/v${VERSION}/syntaxes/hcl.tmGrammar.json"
curl -fL $URL > ./hcl.tmGrammar.json
```

We may consider distributing the grammars via a packaging system in the future.

#### Grammar Mapping

Most highlighting engines match files based on filename patterns. Matched files are then mapped to language IDs. With that in mind we recommend the following mapping.

| Pattern      | Language ID      | Language                  |
| ------------ | ---------------- | ------------------------- |
| `*.hcl`      | `hcl`            | HCL                       |
| `*.tf`       | `terraform`      | [Terraform (configuration)](https://www.terraform.io/language/syntax/configuration) |
| `*.tfvars`   | `terraform-vars` | [Terraform (variables)](https://www.terraform.io/language/values/variables#variable-definitions-tfvars-files) |
| `*.sentinel` | `sentinel`       | [Sentinel (policies)](https://docs.hashicorp.com/sentinel/language/spec) |

Language IDs are also often used in [highlighting Markdown code blocks](https://www.markdownguide.org/extended-syntax/#syntax-highlighting). Picking the right language IDs is key to enable accurate and consistent highlighting everywhere and to enable IntelliSense (such as completion) in editors.

As explained [below](#hcl-vs-terraform--packer--) you can use the HCL grammar to highlight e.g. Terraform files but you should still assign schema-specific language IDs (such as `terraform` or `terraform-vars`) to these files.

## How do I contribute?

See instructions in [DEVELOPMENT.md](./DEVELOPMENT.md).

### Non-TextMate grammars

We do not accept contributions of non-TextMate grammars at this point as we do not have any established strategy for testability and sustainable maintenance of multiple grammars.

In the meantime you can use other available grammars and highlighting solutions, e.g.

 - [mitchellh/tree-sitter-hcl](https://github.com/mitchellh/tree-sitter-hcl)
 - [PrismJS](https://prismjs.com/#supported-languages)
 - [Rouge](http://rouge.jneen.net/v3.28.0/hcl/)

You may take inspiration from the regular expressions used in our TextMate grammar, assuming your highlighting engine is regex-based.

### Product X grammar

#### HashiCorp Products

We welcome contributions of other product-based grammars (such as Packer) and fixes for any existing grammars.

Bear in mind that TextMate grammars may generally not provide perfectly accurate product-specific highlighting given the complexity of how HCL schemas are applied in various products. Editors are expected to use LSP semantic tokens to compensate for this. We also generally aim to reflect the latest version of the product as TextMate grammars have no way of communicating product versions.

#### 3rd Parties

This repository is intended for grammars of HashiCorp-maintained products. Therefore we do not accept contributions of grammars for HCL-based languages used by 3rd party products. These can be maintained in their own repositories.

Maintainers of such 3rd party grammars are however welcomed to use the provided HCL grammar or take inspiration from any provided product grammar to build their own. Namely we recommend the use of `"include": "source.hcl#pattern-name"` in such a 3rd party product grammar to take advantage of the HCL grammar and treat it as an upstream dependency.

Also make sure to pick a unique language ID (that is different from the ones above) where applicable.

## HCL vs (Terraform / Packer / ...)

In Short: **Can I use grammar X for file Y?**

 - ❌ **Do not** use product grammar (e.g. Terraform) for other products (e.g. Packer)
 - ❌ **Do not** use product grammar (e.g. Terraform) for "generic" HCL
 - ✅ **Do** use HCL grammar to highlight any HCL-based language (incl. Terraform or Packer) where no alternatives exist.

<details>
  <summary markdown="span">Long version</summary>

HCL is a schema-based language. Schema is an integral part of any HCL-based language as it declares the names of blocks, names of attributes, expected expressions and data types etc. You can think of it as similar to JSON schemas in JSON.

The language itself (HCL) cannot and should not imply any schema, i.e. does _not_ imply any block or attribute names. Schema is what makes the language product-specific.

To put it simply:

```
HCL + Schema (e.g. Terraform or Packer) = Product-specific language (Terraform language or Packer language).
```

To provide any product-specific feature, either more precise product-specific highlighting or any IntelliSense, such as completion, hover, go-to-definition etc., editors need to know what schema to use.

For example, to understand the meaning of `resource` block in Terraform when user hovers over it, the editor needs to know the file is a Terraform configuration file. Unlike `terraform`, `hcl` does not convey that information.

Schemas may also differ even in the context of a single product (e.g. `terraform` vs `terraform-vars`). This is why it's essential to use documented language IDs.
</details>

## Why does the TextMate grammar use scope X instead of Y?

Picking the right scope is a balancing act between the following:

 1. [TextMate's own documented naming conventions](https://macromates.com/manual/en/language_grammars)
 1. meaningful semantic mapping between naming conventions and DSL (HCL) constructs
 1. resulting UX when chosen scopes are rendered via common/default themes in editors (which may or may not reflect 1. and 2.)

This has a potential downside for authors of custom themes who may want to be more specific, or generally expect the scopes to more intuitively reflect names of HCL constructs, such as "block", "attribute" etc.

We plan to address these needs via custom semantic tokens and modifiers within VSCode (see [hashicorp/vscode-terraform#958](https://github.com/hashicorp/vscode-terraform/pull/958) for more details) and remain open to feedback how this works in other editors and contexts.

## What about HCL JSON?

We recommend HCL JSON configuration files to be highlighted as plain JSON at this time, for which there should be existing grammars maintained by the community. We do not have an established convention for language IDs for these files as it is unclear whether and how language servers should interact with these files.

## LSP Semantic Token Based Highlighting

[LSP (Language Server Protocol) 3.16](https://microsoft.github.io/language-server-protocol/specifications/specification-3-16/) introduced language server-driven highlighting. Language server is typically better equipped to provide more contextual and accurate highlighting as it can parse the whole AST, unlike a TextMate grammar operating on regex-basis.

### Is LSP the way forward?

LSP 3.17 does support use cases where semantic highlighting is the only way to highlight a file (through [`augmentsSyntaxTokens` client capability](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#semanticTokensClientCapabilities)). However in the context of HCL we recommend semantic highlighting to be used as an _addition_ to highlight product-specific pieces of an HCL-based language (such as Terraform) and improve any inaccuracies of product-specific static grammars, rather than to semantically highlight generic HCL.

Note there are also environments outside of editors in which LSP is not a suitable way of highlighting code - e.g. code rendered on websites such as GitHub or terraform.io.
