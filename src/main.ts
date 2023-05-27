import fs from 'fs/promises';
import path from 'path';
import { format } from 'prettier'
import { generateModule } from './generator/generateModule.js';
import { generatePrimitives } from './generator/generatePrimitive.js';
import { generateIndex } from './generator/generateIndex.js';
import { generateCommon } from './generator/generateCommon.js';
import { generateTable } from './generator/generateTable.js';
import { generateAllEntryFunctionImpl } from './generator/generateEntryFunctionImpl.js';

type Options = {
    sourceDir: string, targetDir: string
};

export async function main(options: Options) {
    console.log('sourceDir', options.sourceDir);
    console.log('targetDir', options.targetDir);

    await fs.mkdir(path.join(options.targetDir, FOLDER_MODULES), { recursive: true });
    await fs.mkdir(path.join(options.targetDir, FOLDER_ENTRIES), { recursive: true });

    // load all abi files
    const allAbis: ABIRoot[] = [];
    const files = await fs.readdir(options.sourceDir);
    for (const file of files) {
        const filepath = path.join(options.sourceDir, file);
        allAbis.push(JSON.parse(await fs.readFile(filepath, 'utf-8')));
    };

    // generate all modules
    allAbis.forEach(async (abi) => {
        await createModuleFile(options, abi);
    });

    createPrimitivesFile(options);
    createPrimitivesTypeFile(options);
    createCommonFile(options);
    createIndexFile(options);
    createTableFile(options, allAbis);
    createEntryFunctionImplFile(options, allAbis);
}

async function createPrimitivesFile(options: Options) {
    const generated = generatePrimitives();
    createFile(options, path.join(FOLDER_TYPES, "primitives.d.ts"), generated);
}

async function createPrimitivesTypeFile(options: Options) {
    const generated = generatePrimitives();
    createFile(options, path.join(FOLDER_TYPES, "primitives.d.ts"), generated);
}

async function createModuleFile(options: Options, abi: ABIRoot) {
    const generated = generateModule(abi);
    const filePath = path.join(FOLDER_MODULES, `${abi.name}.d.ts`);
    createFile(options, filePath, generated);
}

async function createCommonFile(options: Options) {
    const generated = generateCommon();
    createFile(options, path.join(FOLDER_TYPES, "common.d.ts"), generated);
}

async function createTableFile(options: Options, allAbis: ABIRoot[]) {
    const generated = generateTable(allAbis);
    createFile(options, path.join(FOLDER_TYPES, "moduleTable.d.ts"), generated);
}

async function createEntryFunctionImplFile(options: Options, allAbis: ABIRoot[]) {
    allAbis.forEach(async (abi) => {
        const generated = generateAllEntryFunctionImpl(abi);
        createFile(options, path.join(FOLDER_ENTRIES, `${abi.name}.ts`), generated);
    })
}

async function createIndexFile(options: Options) {
    const generated = generateIndex();
    createFile(options, "index.ts", generated);
}

async function createFile(options: Options, targetPath: string, code: string) {
    const formatted = format(code, { parser: 'typescript' });
    await fs.writeFile(path.join(options.targetDir, targetPath), formatted);
    console.log('generated', targetPath);
}

const FOLDER_TYPES = 'types';
const FOLDER_MODULES = path.join("types", "modules");
const FOLDER_ENTRIES = "entries";
