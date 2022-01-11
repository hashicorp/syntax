import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';
import * as oniguruma from 'vscode-oniguruma';
import * as vsctm from 'vscode-textmate';

export async function getGrammar(filePath: string, grammar: vsctm.IGrammar) {
  const wasmBin = fs.readFileSync(path.join(__dirname, '../node_modules/vscode-oniguruma/release/onig.wasm')).buffer;

  const vscodeOnigurumaLib = oniguruma.loadWASM(wasmBin).then(() => {
    return {
      createOnigScanner(patterns: string[]) {
        return new oniguruma.OnigScanner(patterns);
      },
      createOnigString(s: string) {
        return new oniguruma.OnigString(s);
      },
    };
  });

  
  const registry = new vsctm.Registry({
    onigLib: vscodeOnigurumaLib,
    loadGrammar: () => Promise.resolve(null),
  });

  const data = await fsPromises.readFile(filePath);
  const rawgrammer = vsctm.parseRawGrammar(data.toString(), filePath);
  grammar = await registry.addGrammar(rawgrammer);

  return grammar;
}

export function getTokens(grammar: vsctm.IGrammar, text: string, timeLimit = 100): vsctm.IToken[] {
  const result = grammar.tokenizeLine(text, null, timeLimit);
  const tokens = result.tokens;
  return tokens;
}
