import cson from 'cson';
import * as plist from 'plist';
import * as path from 'path';
import * as yaml from 'yaml';
import { promises as fsPromises } from 'fs';

const languages = ['terraform'];

languages.forEach(async (lang) => {
  console.log(lang);
  const sourceJSON = path.join(__dirname, 'src', lang, `${lang}.tmGrammar.json`);
  const destPath = path.join(__dirname, 'syntaxes', lang);

  console.log(`Reading ${sourceJSON}`);
  const text = await fsPromises.readFile(sourceJSON);
  const data = JSON.parse(text.toString());

  await fsPromises.copyFile(sourceJSON, path.join('./syntaxes', lang, `${lang}.tmGrammar.json`));

  // cson
  const csonfile = path.join(destPath, `${lang}.tmGrammar.cson`);
  console.log(`Exporting ${csonfile}`);
  await fsPromises.writeFile(csonfile, cson.stringify(data));

  // textmate
  const plistfile = path.join(destPath, `${lang}.tmGrammar`);
  console.log(`Exporting ${plistfile}`);
  await fsPromises.writeFile(plistfile, plist.build(data));

  // yaml
  const yamlfile = path.join(destPath, `${lang}.yaml`);
  console.log(`Exporting ${yamlfile}`);
  await fsPromises.writeFile(yamlfile, yaml.stringify(data));
});
