#!/usr/bin/env node
import commandLineArgs from 'command-line-args';
import { main } from './main.js';

const optionDefinitions = [
    { name: 'sourceDir', type: String, defaultOption: true },
    { name: 'targetDir', type: String, defaultValue: 'bindings' },
    { name: 'config', type: String },
]

main(commandLineArgs(optionDefinitions));

