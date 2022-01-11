import * as path from 'path';
import * as vsctm from 'vscode-textmate';
import { getGrammar, getTokens } from '../helper';

describe('terraform.tmGrammar', function () {
  let grammar: vsctm.IGrammar;

  beforeAll(async () => {
    const filePath =  path.join(__dirname, '../../terraform/terraform.tmGrammar.json');
    grammar = await getGrammar(filePath, grammar);
    expect(grammar).toBeDefined();
  });

  it('default scope is scope.terraform', async function () {
    const tokens = getTokens(grammar, '');
    expect(tokens).toStrictEqual([{ startIndex: 0, endIndex: 1, scopes: ['scope.terraform'] }]);
  });

  describe('simple single provider and resource', function () {
    it('tokenizes correctly', function () {
      const tokens = getTokens(
        grammar,
        `# stuff
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 2.65"
    }
  }
  required_version = ">= 1.1.0"
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rg" {
  name     = "myTFResourceGroup"
  location = "westus2"
}`,
      );

      expect(tokens).toStrictEqual([
        {
          startIndex: 0,
          endIndex: 1,
          scopes: ['scope.terraform', 'comment.line.terraform', 'punctuation.definition.comment.terraform'],
        },
        {
          startIndex: 1,
          endIndex: 7,
          scopes: ['scope.terraform', 'comment.line.terraform'],
        },
        {
          startIndex: 7,
          endIndex: 8,
          scopes: ['scope.terraform', 'comment.line.terraform', 'punctuation.definition.comment.terraform'],
        },
        {
          startIndex: 8,
          endIndex: 17,
          scopes: ['scope.terraform', 'meta.block.terraform', 'entity.name.type.terraform'],
        },
        {
          startIndex: 17,
          endIndex: 18,
          scopes: ['scope.terraform', 'meta.block.terraform'],
        },
        {
          startIndex: 18,
          endIndex: 19,
          scopes: ['scope.terraform', 'meta.block.terraform', 'punctuation.section.block.begin.terraform'],
        },
        {
          startIndex: 19,
          endIndex: 22,
          scopes: ['scope.terraform', 'meta.block.terraform'],
        },
        {
          startIndex: 22,
          endIndex: 40,
          scopes: ['scope.terraform', 'meta.block.terraform', 'meta.block.terraform', 'entity.name.label.terraform'],
        },
        {
          startIndex: 40,
          endIndex: 41,
          scopes: ['scope.terraform', 'meta.block.terraform', 'meta.block.terraform'],
        },
        {
          startIndex: 41,
          endIndex: 42,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'meta.block.terraform',
            'punctuation.section.block.begin.terraform',
          ],
        },
        {
          startIndex: 42,
          endIndex: 47,
          scopes: ['scope.terraform', 'meta.block.terraform', 'meta.block.terraform'],
        },
        {
          startIndex: 47,
          endIndex: 54,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'meta.block.terraform',
            'variable.declaration.terraform',
            'variable.other.readwrite.terraform',
          ],
        },
        {
          startIndex: 54,
          endIndex: 55,
          scopes: ['scope.terraform', 'meta.block.terraform', 'meta.block.terraform', 'variable.declaration.terraform'],
        },
        {
          startIndex: 55,
          endIndex: 56,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'meta.block.terraform',
            'variable.declaration.terraform',
            'keyword.operator.assignment.terraform',
          ],
        },
        {
          startIndex: 56,
          endIndex: 57,
          scopes: ['scope.terraform', 'meta.block.terraform', 'meta.block.terraform', 'variable.declaration.terraform'],
        },
        {
          startIndex: 57,
          endIndex: 58,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'meta.block.terraform',
            'meta.braces.terraform',
            'punctuation.section.braces.begin.terraform',
          ],
        },
        {
          startIndex: 58,
          endIndex: 65,
          scopes: ['scope.terraform', 'meta.block.terraform', 'meta.block.terraform', 'meta.braces.terraform'],
        },
        {
          startIndex: 65,
          endIndex: 71,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'meta.block.terraform',
            'meta.braces.terraform',
            'meta.mapping.key.terraform',
            'string.unquoted.terraform',
          ],
        },
        {
          startIndex: 71,
          endIndex: 73,
          scopes: ['scope.terraform', 'meta.block.terraform', 'meta.block.terraform', 'meta.braces.terraform'],
        },
        {
          startIndex: 73,
          endIndex: 74,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'meta.block.terraform',
            'meta.braces.terraform',
            'keyword.operator.terraform',
          ],
        },
        {
          startIndex: 74,
          endIndex: 75,
          scopes: ['scope.terraform', 'meta.block.terraform', 'meta.block.terraform', 'meta.braces.terraform'],
        },
        {
          startIndex: 75,
          endIndex: 76,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'meta.block.terraform',
            'meta.braces.terraform',
            'string.quoted.double.terraform',
            'punctuation.definition.string.begin.terraform',
          ],
        },
        {
          startIndex: 76,
          endIndex: 93,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'meta.block.terraform',
            'meta.braces.terraform',
            'string.quoted.double.terraform',
          ],
        },
        {
          startIndex: 93,
          endIndex: 94,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'meta.block.terraform',
            'meta.braces.terraform',
            'string.quoted.double.terraform',
            'punctuation.definition.string.end.terraform',
          ],
        },
        {
          startIndex: 94,
          endIndex: 101,
          scopes: ['scope.terraform', 'meta.block.terraform', 'meta.block.terraform', 'meta.braces.terraform'],
        },
        {
          startIndex: 101,
          endIndex: 108,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'meta.block.terraform',
            'meta.braces.terraform',
            'meta.mapping.key.terraform',
            'string.unquoted.terraform',
          ],
        },
        {
          startIndex: 108,
          endIndex: 109,
          scopes: ['scope.terraform', 'meta.block.terraform', 'meta.block.terraform', 'meta.braces.terraform'],
        },
        {
          startIndex: 109,
          endIndex: 110,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'meta.block.terraform',
            'meta.braces.terraform',
            'keyword.operator.terraform',
          ],
        },
        {
          startIndex: 110,
          endIndex: 111,
          scopes: ['scope.terraform', 'meta.block.terraform', 'meta.block.terraform', 'meta.braces.terraform'],
        },
        {
          startIndex: 111,
          endIndex: 112,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'meta.block.terraform',
            'meta.braces.terraform',
            'string.quoted.double.terraform',
            'punctuation.definition.string.begin.terraform',
          ],
        },
        {
          startIndex: 112,
          endIndex: 119,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'meta.block.terraform',
            'meta.braces.terraform',
            'string.quoted.double.terraform',
          ],
        },
        {
          startIndex: 119,
          endIndex: 120,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'meta.block.terraform',
            'meta.braces.terraform',
            'string.quoted.double.terraform',
            'punctuation.definition.string.end.terraform',
          ],
        },
        {
          startIndex: 120,
          endIndex: 125,
          scopes: ['scope.terraform', 'meta.block.terraform', 'meta.block.terraform', 'meta.braces.terraform'],
        },
        {
          startIndex: 125,
          endIndex: 126,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'meta.block.terraform',
            'meta.braces.terraform',
            'punctuation.section.braces.end.terraform',
          ],
        },
        {
          startIndex: 126,
          endIndex: 129,
          scopes: ['scope.terraform', 'meta.block.terraform', 'meta.block.terraform'],
        },
        {
          startIndex: 129,
          endIndex: 130,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'meta.block.terraform',
            'punctuation.section.block.end.terraform',
          ],
        },
        {
          startIndex: 130,
          endIndex: 133,
          scopes: ['scope.terraform', 'meta.block.terraform'],
        },
        {
          startIndex: 133,
          endIndex: 149,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'variable.declaration.terraform',
            'variable.other.readwrite.terraform',
          ],
        },
        {
          startIndex: 149,
          endIndex: 150,
          scopes: ['scope.terraform', 'meta.block.terraform', 'variable.declaration.terraform'],
        },
        {
          startIndex: 150,
          endIndex: 151,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'variable.declaration.terraform',
            'keyword.operator.assignment.terraform',
          ],
        },
        {
          startIndex: 151,
          endIndex: 152,
          scopes: ['scope.terraform', 'meta.block.terraform', 'variable.declaration.terraform'],
        },
        {
          startIndex: 152,
          endIndex: 153,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'string.quoted.double.terraform',
            'punctuation.definition.string.begin.terraform',
          ],
        },
        {
          startIndex: 153,
          endIndex: 161,
          scopes: ['scope.terraform', 'meta.block.terraform', 'string.quoted.double.terraform'],
        },
        {
          startIndex: 161,
          endIndex: 162,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'string.quoted.double.terraform',
            'punctuation.definition.string.end.terraform',
          ],
        },
        {
          startIndex: 162,
          endIndex: 163,
          scopes: ['scope.terraform', 'meta.block.terraform'],
        },
        {
          startIndex: 163,
          endIndex: 164,
          scopes: ['scope.terraform', 'meta.block.terraform', 'punctuation.section.block.end.terraform'],
        },
        { startIndex: 164, endIndex: 166, scopes: ['scope.terraform'] },
        {
          startIndex: 166,
          endIndex: 174,
          scopes: ['scope.terraform', 'meta.block.terraform', 'entity.name.type.terraform'],
        },
        {
          startIndex: 174,
          endIndex: 175,
          scopes: ['scope.terraform', 'meta.block.terraform'],
        },
        {
          startIndex: 175,
          endIndex: 176,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'string.quoted.double.terraform',
            'punctuation.definition.string.begin.terraform',
          ],
        },
        {
          startIndex: 176,
          endIndex: 183,
          scopes: ['scope.terraform', 'meta.block.terraform', 'string.quoted.double.terraform'],
        },
        {
          startIndex: 183,
          endIndex: 184,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'string.quoted.double.terraform',
            'punctuation.definition.string.end.terraform',
          ],
        },
        {
          startIndex: 184,
          endIndex: 185,
          scopes: ['scope.terraform', 'meta.block.terraform'],
        },
        {
          startIndex: 185,
          endIndex: 186,
          scopes: ['scope.terraform', 'meta.block.terraform', 'punctuation.section.block.begin.terraform'],
        },
        {
          startIndex: 186,
          endIndex: 189,
          scopes: ['scope.terraform', 'meta.block.terraform'],
        },
        {
          startIndex: 189,
          endIndex: 197,
          scopes: ['scope.terraform', 'meta.block.terraform', 'meta.block.terraform', 'entity.name.label.terraform'],
        },
        {
          startIndex: 197,
          endIndex: 198,
          scopes: ['scope.terraform', 'meta.block.terraform', 'meta.block.terraform'],
        },
        {
          startIndex: 198,
          endIndex: 199,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'meta.block.terraform',
            'punctuation.section.block.begin.terraform',
          ],
        },
        {
          startIndex: 199,
          endIndex: 200,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'meta.block.terraform',
            'punctuation.section.block.end.terraform',
          ],
        },
        {
          startIndex: 200,
          endIndex: 201,
          scopes: ['scope.terraform', 'meta.block.terraform'],
        },
        {
          startIndex: 201,
          endIndex: 202,
          scopes: ['scope.terraform', 'meta.block.terraform', 'punctuation.section.block.end.terraform'],
        },
        { startIndex: 202, endIndex: 204, scopes: ['scope.terraform'] },
        {
          startIndex: 204,
          endIndex: 212,
          scopes: ['scope.terraform', 'meta.block.terraform', 'entity.name.type.terraform'],
        },
        {
          startIndex: 212,
          endIndex: 213,
          scopes: ['scope.terraform', 'meta.block.terraform'],
        },
        {
          startIndex: 213,
          endIndex: 214,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'string.quoted.double.terraform',
            'punctuation.definition.string.begin.terraform',
          ],
        },
        {
          startIndex: 214,
          endIndex: 236,
          scopes: ['scope.terraform', 'meta.block.terraform', 'string.quoted.double.terraform'],
        },
        {
          startIndex: 236,
          endIndex: 237,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'string.quoted.double.terraform',
            'punctuation.definition.string.end.terraform',
          ],
        },
        {
          startIndex: 237,
          endIndex: 238,
          scopes: ['scope.terraform', 'meta.block.terraform'],
        },
        {
          startIndex: 238,
          endIndex: 239,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'string.quoted.double.terraform',
            'punctuation.definition.string.begin.terraform',
          ],
        },
        {
          startIndex: 239,
          endIndex: 241,
          scopes: ['scope.terraform', 'meta.block.terraform', 'string.quoted.double.terraform'],
        },
        {
          startIndex: 241,
          endIndex: 242,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'string.quoted.double.terraform',
            'punctuation.definition.string.end.terraform',
          ],
        },
        {
          startIndex: 242,
          endIndex: 243,
          scopes: ['scope.terraform', 'meta.block.terraform'],
        },
        {
          startIndex: 243,
          endIndex: 244,
          scopes: ['scope.terraform', 'meta.block.terraform', 'punctuation.section.block.begin.terraform'],
        },
        {
          startIndex: 244,
          endIndex: 247,
          scopes: ['scope.terraform', 'meta.block.terraform'],
        },
        {
          startIndex: 247,
          endIndex: 251,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'variable.declaration.terraform',
            'variable.other.readwrite.terraform',
          ],
        },
        {
          startIndex: 251,
          endIndex: 256,
          scopes: ['scope.terraform', 'meta.block.terraform', 'variable.declaration.terraform'],
        },
        {
          startIndex: 256,
          endIndex: 257,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'variable.declaration.terraform',
            'keyword.operator.assignment.terraform',
          ],
        },
        {
          startIndex: 257,
          endIndex: 258,
          scopes: ['scope.terraform', 'meta.block.terraform', 'variable.declaration.terraform'],
        },
        {
          startIndex: 258,
          endIndex: 259,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'string.quoted.double.terraform',
            'punctuation.definition.string.begin.terraform',
          ],
        },
        {
          startIndex: 259,
          endIndex: 276,
          scopes: ['scope.terraform', 'meta.block.terraform', 'string.quoted.double.terraform'],
        },
        {
          startIndex: 276,
          endIndex: 277,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'string.quoted.double.terraform',
            'punctuation.definition.string.end.terraform',
          ],
        },
        {
          startIndex: 277,
          endIndex: 280,
          scopes: ['scope.terraform', 'meta.block.terraform'],
        },
        {
          startIndex: 280,
          endIndex: 288,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'variable.declaration.terraform',
            'variable.other.readwrite.terraform',
          ],
        },
        {
          startIndex: 288,
          endIndex: 289,
          scopes: ['scope.terraform', 'meta.block.terraform', 'variable.declaration.terraform'],
        },
        {
          startIndex: 289,
          endIndex: 290,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'variable.declaration.terraform',
            'keyword.operator.assignment.terraform',
          ],
        },
        {
          startIndex: 290,
          endIndex: 291,
          scopes: ['scope.terraform', 'meta.block.terraform', 'variable.declaration.terraform'],
        },
        {
          startIndex: 291,
          endIndex: 292,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'string.quoted.double.terraform',
            'punctuation.definition.string.begin.terraform',
          ],
        },
        {
          startIndex: 292,
          endIndex: 299,
          scopes: ['scope.terraform', 'meta.block.terraform', 'string.quoted.double.terraform'],
        },
        {
          startIndex: 299,
          endIndex: 300,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'string.quoted.double.terraform',
            'punctuation.definition.string.end.terraform',
          ],
        },
        {
          startIndex: 300,
          endIndex: 301,
          scopes: ['scope.terraform', 'meta.block.terraform'],
        },
        {
          startIndex: 301,
          endIndex: 302,
          scopes: ['scope.terraform', 'meta.block.terraform', 'punctuation.section.block.end.terraform'],
        },
      ]);
    });
  });
});
