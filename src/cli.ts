#!/usr/bin/env node
import commandLineArgs from 'command-line-args';
import { ABIRoot } from './abi.js';
import fs from 'fs/promises';
import path from 'path';
import { generateAll } from './generator/generateAll.js';
import { format } from 'prettier'

type Options = {
    sourceDir: string, targetDir: string
};

const optionDefinitions = [
    { name: 'sourceDir', type: String, defaultOption: true },
    { name: 'targetDir', type: String, defaultValue: 'bindings' },
]

async function main(options: Options) {
    console.log('sourceDir', options.sourceDir);
    console.log('targetDir', options.targetDir);

    const files = await fs.readdir(options.sourceDir);
    console.log('files', files);

    // TODO: read all files
    const filepath = path.join(options.sourceDir, 'coin.json');

    const abi: ABIRoot = JSON.parse(await fs.readFile(filepath, 'utf-8'));

    const generated = generateAll(abi);
    const formatted = format(generated, { parser: 'typescript' });
    
    fs.mkdir(options.targetDir, { recursive: true });
    fs.writeFile(path.join(options.targetDir, 'coin.ts'), formatted);
}

main(commandLineArgs(optionDefinitions));

