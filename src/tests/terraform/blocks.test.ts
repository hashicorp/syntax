import * as path from 'path';
import * as vsctm from 'vscode-textmate';
import { getGrammar, getTokens } from '../helper';

describe('terraform blocks', function () {
  let grammar: vsctm.IGrammar;

  beforeAll(async () => {
    const filePath = path.join(__dirname, '../../terraform/terraform.tmGrammar.json');
    grammar = await getGrammar(filePath, grammar);
    expect(grammar).toBeDefined();
  });

  describe('single terraform resource declaration', function () {
    let tokens: vsctm.IToken[];

    it('tokenizes correctly', function () {
      tokens = getTokens(
        grammar,
        `resource "azurerm_resource_group" "rg" {\n\tname = "myTFResourceGroup"\nlocation = "westus2"\n}\n`,
        // ^^^^^^ entity.name.type.terraform
        //        ^ punctuation.definition.string.begin.terraform
        //         ^^^^^^^^^^^^^^^^^^^^^^ string.quoted.double.terraform
        //                               ^ punctuation.definition.string.end.terraform
        //                                 ^ punctuation.definition.string.begin.terraform
        //                                  ^^ string.quoted.double.terraform
        //                                    ^ punctuation.definition.string.end.terraform
        //                                      ^ punctuation.section.block.begin.terraform
      );
      expect(tokens).toBeDefined();
    });

    it('finds resource declaration begin line', function () {
      expect(tokens.slice(0, 11)).toStrictEqual([
        {
          startIndex: 0,
          endIndex: 8,
          scopes: ['scope.terraform', 'meta.block.terraform', 'entity.name.type.terraform'],
        },
        {
          startIndex: 8,
          endIndex: 9,
          scopes: ['scope.terraform', 'meta.block.terraform'],
        },
        {
          startIndex: 9,
          endIndex: 10,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'string.quoted.double.terraform',
            'punctuation.definition.string.begin.terraform',
          ],
        },
        {
          startIndex: 10,
          endIndex: 32,
          scopes: ['scope.terraform', 'meta.block.terraform', 'string.quoted.double.terraform'],
        },
        {
          startIndex: 32,
          endIndex: 33,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'string.quoted.double.terraform',
            'punctuation.definition.string.end.terraform',
          ],
        },
        {
          startIndex: 33,
          endIndex: 34,
          scopes: ['scope.terraform', 'meta.block.terraform'],
        },
        {
          startIndex: 34,
          endIndex: 35,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'string.quoted.double.terraform',
            'punctuation.definition.string.begin.terraform',
          ],
        },
        {
          startIndex: 35,
          endIndex: 37,
          scopes: ['scope.terraform', 'meta.block.terraform', 'string.quoted.double.terraform'],
        },
        {
          startIndex: 37,
          endIndex: 38,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'string.quoted.double.terraform',
            'punctuation.definition.string.end.terraform',
          ],
        },
        {
          startIndex: 38,
          endIndex: 39,
          scopes: ['scope.terraform', 'meta.block.terraform'],
        },
        {
          startIndex: 39,
          endIndex: 40,
          scopes: ['scope.terraform', 'meta.block.terraform', 'punctuation.section.block.begin.terraform'],
        },
      ]);
    });

    it('finds resource label', function () {
      expect([tokens[1], tokens[2], tokens[3], tokens[4]]).toStrictEqual([
        {
          startIndex: 8,
          endIndex: 9,
          scopes: ['scope.terraform', 'meta.block.terraform'],
        },
        {
          startIndex: 9,
          endIndex: 10,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'string.quoted.double.terraform',
            'punctuation.definition.string.begin.terraform',
          ],
        },
        {
          startIndex: 10,
          endIndex: 32,
          scopes: ['scope.terraform', 'meta.block.terraform', 'string.quoted.double.terraform'],
        },
        {
          startIndex: 32,
          endIndex: 33,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'string.quoted.double.terraform',
            'punctuation.definition.string.end.terraform',
          ],
        },
      ]);
    });

    it('finds resource name', function () {
      expect([tokens[6], tokens[7], tokens[8]]).toStrictEqual([
        {
          startIndex: 34,
          endIndex: 35,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'string.quoted.double.terraform',
            'punctuation.definition.string.begin.terraform',
          ],
        },
        {
          startIndex: 35,
          endIndex: 37,
          scopes: ['scope.terraform', 'meta.block.terraform', 'string.quoted.double.terraform'],
        },
        {
          startIndex: 37,
          endIndex: 38,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'string.quoted.double.terraform',
            'punctuation.definition.string.end.terraform',
          ],
        },
      ]);
    });

    it('finds resource block begin', function () {
      expect([tokens[10]]).toStrictEqual([
        {
          startIndex: 39,
          endIndex: 40,
          scopes: ['scope.terraform', 'meta.block.terraform', 'punctuation.section.block.begin.terraform'],
        },
      ]);
    });

    it('finds resource attribute declaration', function () {
      expect(tokens.slice(12, 19)).toStrictEqual([
        {
          startIndex: 42,
          endIndex: 46,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'variable.declaration.terraform',
            'variable.other.readwrite.terraform',
          ],
        },
        {
          startIndex: 46,
          endIndex: 47,
          scopes: ['scope.terraform', 'meta.block.terraform', 'variable.declaration.terraform'],
        },
        {
          startIndex: 47,
          endIndex: 48,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'variable.declaration.terraform',
            'keyword.operator.assignment.terraform',
          ],
        },
        {
          startIndex: 48,
          endIndex: 49,
          scopes: ['scope.terraform', 'meta.block.terraform', 'variable.declaration.terraform'],
        },
        {
          startIndex: 49,
          endIndex: 50,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'string.quoted.double.terraform',
            'punctuation.definition.string.begin.terraform',
          ],
        },
        {
          startIndex: 50,
          endIndex: 67,
          scopes: ['scope.terraform', 'meta.block.terraform', 'string.quoted.double.terraform'],
        },
        {
          startIndex: 67,
          endIndex: 68,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'string.quoted.double.terraform',
            'punctuation.definition.string.end.terraform',
          ],
        },
      ]);
    });

    it('finds resource block end', function () {
      expect([tokens[28], tokens[29]]).toStrictEqual([
        {
          startIndex: 90,
          endIndex: 91,
          scopes: ['scope.terraform', 'meta.block.terraform', 'punctuation.section.block.end.terraform'],
        },
        { startIndex: 91, endIndex: 93, scopes: ['scope.terraform'] },
      ]);
    });
  });

  describe('single terraform provider declaration', function () {
    let tokens: vsctm.IToken[];

    it('tokenizes correctly', function () {
      tokens = getTokens(
        grammar,
        `provider "azurerm" {\n\tfeatures { }\n`,
        // ^^^^^^ entity.name.type.terraform
        //        ^ punctuation.definition.string.begin.terraform
        //         ^^^^^^^ string.quoted.double.terraform
        //                ^ punctuation.definition.string.end.terraform
        //                  ^ punctuation.definition.string.begin.terraform
      );
      expect(tokens).toBeDefined();
    });

    it('finds provider declaration begin line', function () {
      expect(tokens.slice(0, 7)).toStrictEqual([
        {
          startIndex: 0,
          endIndex: 8,
          scopes: ['scope.terraform', 'meta.block.terraform', 'entity.name.type.terraform'],
        },
        {
          startIndex: 8,
          endIndex: 9,
          scopes: ['scope.terraform', 'meta.block.terraform'],
        },
        {
          startIndex: 9,
          endIndex: 10,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'string.quoted.double.terraform',
            'punctuation.definition.string.begin.terraform',
          ],
        },
        {
          startIndex: 10,
          endIndex: 17,
          scopes: ['scope.terraform', 'meta.block.terraform', 'string.quoted.double.terraform'],
        },
        {
          startIndex: 17,
          endIndex: 18,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'string.quoted.double.terraform',
            'punctuation.definition.string.end.terraform',
          ],
        },
        {
          startIndex: 18,
          endIndex: 19,
          scopes: ['scope.terraform', 'meta.block.terraform'],
        },
        {
          startIndex: 19,
          endIndex: 20,
          scopes: ['scope.terraform', 'meta.block.terraform', 'punctuation.section.block.begin.terraform'],
        },
      ]);
    });

    it('finds provider attribute block begin', function () {
      expect(tokens.slice(7, 14)).toStrictEqual([
        {
          startIndex: 20,
          endIndex: 22,
          scopes: ['scope.terraform', 'meta.block.terraform'],
        },
        {
          startIndex: 22,
          endIndex: 30,
          scopes: ['scope.terraform', 'meta.block.terraform', 'meta.block.terraform', 'entity.name.label.terraform'],
        },
        {
          startIndex: 30,
          endIndex: 31,
          scopes: ['scope.terraform', 'meta.block.terraform', 'meta.block.terraform'],
        },
        {
          startIndex: 31,
          endIndex: 32,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'meta.block.terraform',
            'punctuation.section.block.begin.terraform',
          ],
        },
        {
          startIndex: 32,
          endIndex: 33,
          scopes: ['scope.terraform', 'meta.block.terraform', 'meta.block.terraform'],
        },
        {
          startIndex: 33,
          endIndex: 34,
          scopes: [
            'scope.terraform',
            'meta.block.terraform',
            'meta.block.terraform',
            'punctuation.section.block.end.terraform',
          ],
        },
        {
          startIndex: 34,
          endIndex: 36,
          scopes: ['scope.terraform', 'meta.block.terraform'],
        },
      ]);
    });
  });
});
