/**
 * Copyright IBM Corp. 2026
 * SPDX-License-Identifier: MPL-2.0
 */

interface Entry {
  patterns?: {
    include?: string;
  }[];
}

const SUPPORTED_GRAMMARS = ["hcl", "sentinel", "terraform"];

/**
 * Generates a mermaid graph in the following form:
 *
 * graph LR
 *  A --> B
 *  A --> C
 *  B --> C
 */
function generateMermaidSyntax(source: any) {
  const result: string[] = ["graph LR"];

  function graphEntry(name: string, entry: Entry) {
    if (!entry.patterns) {
      return;
    }

    for (const pattern of entry.patterns) {
      if (!pattern.include) {
        continue;
      }
      const include = pattern.include.substring(1);

      if (result.includes(`${name} --> ${include}`)) {
        continue;
      }

      result.push(`${name} --> ${include}`);
      if (source.repository[include]) {
        graphEntry(include, source.repository[include]);
      }
    }
  }

  for (const pattern of source.patterns) {
    const include = pattern.include.substr(1);
    result.push(`START--> ${include}`);

    graphEntry(include, source.repository[include]);
  }

  return result.filter((x) => !x.includes("comment")).join("\n");
  return result.join("\n");
}

/**
 * Reads the product specific JSON grammar file
 */
function readSyntaxFile(kind: string) {
  switch (kind) {
    case "terraform":
      return require("../syntaxes/terraform.tmGrammar.json");
    case "hcl":
      return require("../syntaxes/hcl.tmGrammar.json");
    default:
      return {};
  }
}

function renderGraph(mermaidSyntax: string) {
  // TODO? directly integrate with mermaid to output a PNG
  console.log(mermaidSyntax);
}

function run() {
  const args = process.argv.slice(2);

  if (args.length === 0 || !SUPPORTED_GRAMMARS.includes(args[0])) {
    console.error(`Please provide a grammar. Possible values: ${SUPPORTED_GRAMMARS.join(", ")}`);
    return;
  }

  const grammar = readSyntaxFile(args[0]);
  const mermaidSyntax = generateMermaidSyntax(grammar);

  renderGraph(mermaidSyntax);
}

run();
