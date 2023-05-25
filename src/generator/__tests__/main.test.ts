describe('generate struct', () => {
    // Act before assertions
    beforeAll(async () => { });

    // Teardown (cleanup) after assertions
    afterAll(() => { });

    it('bool type fields', () => {
        const ts = require('typescript');
        const fs = require('fs');
        const os = require('os');
        const path = require('path');

        function checkTypeScriptCode(code) {
            // Create a temporary directory
            const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ts-temp-'));

            // Create a temporary file path
            const tempFilePath = path.join(tempDir, 'dummy.ts');

            // Write the code to the temporary file
            fs.writeFileSync(tempFilePath, code);

            const compilerOptions = {
                target: ts.ScriptTarget.ES2018,
                module: ts.ModuleKind.CommonJS
                // Add any additional compiler options you require
            };

            const program = ts.createProgram({
                rootNames: [tempFilePath],
                options: compilerOptions
            });

            const diagnostics = ts.getPreEmitDiagnostics(program);

            if (diagnostics.length === 0) {
                expect(true).toBe(true);
            } else {
                console.log('Type checking failed. Diagnostics:');
                diagnostics.forEach((diagnostic) => {
                    const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
                    if (diagnostic.file) {
                        const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
                        console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
                    } else {
                        console.log(message);
                    }
                });
                expect(false).toBe(true);
            }

            // Delete the temporary file and directory
            fs.unlinkSync(tempFilePath);
            fs.rmdirSync(tempDir);
        }

        const sourceCode = `const a:number = 1;`;
        checkTypeScriptCode(sourceCode);

    });


});
