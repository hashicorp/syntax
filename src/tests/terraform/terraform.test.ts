import * as path from 'path';
import * as vsctm from 'vscode-textmate';
import { getGrammar, getTokens } from '../helper';

describe('terraform.tmGrammar', function () {
  let grammar: vsctm.IGrammar;

  beforeAll(async () => {
    const filePath = path.join(__dirname, '../../terraform/terraform.tmGrammar.json');
    grammar = await getGrammar(filePath, grammar);
    expect(grammar).toBeDefined();
  });

  it('default scope is scope.terraform', async function () {
    const tokens = getTokens(grammar, '');
    expect(tokens).toStrictEqual([{ startIndex: 0, endIndex: 1, scopes: ['scope.terraform'] }]);
  });
});
