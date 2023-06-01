import fs from 'fs/promises';
import path from 'path';
import https from 'https';
import { format } from 'prettier'
import { generateModule } from './generator/generateModule.js';
import { generatePrimitives } from './generator/generatePrimitive.js';
import { generateIndex } from './generator/generateIndex.js';
import { generateCommon } from './generator/generateCommon.js';
import { generateTable } from './generator/generateTable.js';
import { generateAllEntryFunctionImpl } from './generator/generateEntryFunctionImpl.js';
import { generateReactHooks } from './generator/generateReactHooks.js';
import { accountTable } from './accountTable.js';
import { capitalizeFirstLetter } from './generator/utils.js';
import { abiPreProcessor, normalizeAddress } from './abiPreprocessor.js';
import { generateImpl } from './generator/generateImpl.js';

type Options = {
    sourceDir: string, targetDir: string, config: string
};

export async function main(options: Options) {
    console.log('sourceDir', options.sourceDir);
    console.log('targetDir', options.targetDir);
    console.log('config', options.config);

    // TODO: make the config file better
    const config: {
        address: string,
        name: string,
    }[] = (await import(path.join(process.cwd(), options.config))).default;

    await fs.mkdir(path.join(options.targetDir, FOLDER_MODULES), { recursive: true });
    await fs.mkdir(path.join(options.targetDir, FOLDER_ENTRIES), { recursive: true });

    // load all abi files
    const allAbis: ABIRoot[] = [];
    if (!config) {
        const files = await fs.readdir(options.sourceDir);
        for (const file of files) {
            const filepath = path.join(options.sourceDir, file);
            allAbis.push(JSON.parse(await fs.readFile(filepath, 'utf-8')));
        };
        generateFiles(allAbis, options);
    }
    else {
        // setup account table, which would be used by generator.
        config.forEach(item => accountTable[normalizeAddress(item.address)] = item.name ?? "");

        // fetch all modules data from all accounts
        await Promise.all(
            config.map(item => new Promise<void>((resolve, reject) => {
                https.get(`https://fullnode.mainnet.aptoslabs.com/v1/accounts/${item.address}/modules`, (response) => {
                    let data = '';
                    response.on('data', (chunk) => data += chunk);
                    response.on('end', () => {
                        const rawResponse: {
                            bytecode: string,
                            abi: ABIRoot
                        }[] = JSON.parse(data);
                        rawResponse.forEach(item =>
                            allAbis.push(abiPreProcessor(item.abi)));
                        console.log('fetched', item.address);

                        resolve();
                    });
                }).on('error', (error) => {
                    reject(error);
                });
            })));

        generateFiles(allAbis, options);
    }
}

function generateFiles(allAbis: ABIRoot[], options: Options) {
    console.log('start generating');
    allAbis.forEach(async (abi) => {
        await createModuleFile(options, abi);
    });

    createPrimitivesTypeFile(options);
    createCommonFile(options);
    createIndexFile(options);
    createImplFile(options);
    createHooksFile(options);
    createTableFile(options, allAbis);
    createEntryFunctionImplFile(options, allAbis);
}

async function createHooksFile(options: Options) {
    const generated = generateReactHooks();
    createFile(options, "hooks.ts", generated);
}

async function createPrimitivesTypeFile(options: Options) {
    const generated = generatePrimitives();
    createFile(options, path.join(FOLDER_TYPES, "primitives.d.ts"), generated);
}

async function createModuleFile(options: Options, abi: ABIRoot) {
    const generated = generateModule(abi);
    const filePath = path.join(
        FOLDER_MODULES,
        `${accountTable[abi.address]}${capitalizeFirstLetter(abi.name)}.d.ts`);
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
        generated && createFile(options, path.join(FOLDER_ENTRIES, `${accountTable[abi.address] ?? ""}${capitalizeFirstLetter(abi.name)}.ts`), generated);
    })
}

async function createIndexFile(options: Options) {
    const generated = generateIndex();
    createFile(options, "index.ts", generated);
}

async function createImplFile(options: Options) {
    const generated = generateImpl();
    createFile(options, "impl.ts", generated);
}

async function createFile(options: Options, targetPath: string, code: string) {
    const withComments = `
    /* Autogenerated file. Do not edit manually. */
    /* tslint:disable */
    /* eslint-disable */

    ` + code;
    const formatted = format(withComments, { parser: 'typescript' });
    await fs.writeFile(path.join(options.targetDir, targetPath), formatted);
    console.log('generated', targetPath);
}

const FOLDER_TYPES = 'types';
const FOLDER_MODULES = path.join("types", "modules");
const FOLDER_ENTRIES = "entries";
