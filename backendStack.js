import fs from 'fs-extra';
import path from 'path';
import { exec } from 'child_process';
import { createSpinner } from 'nanospinner';

const sleep = (ms=2000) => new Promise((r)=>setTimeout(r,ms))

async function spin(loader,ans) {
    const spinner = createSpinner(`${loader}`).start()
    await sleep()
    spinner.success({text:`${ans} Successfully initialized!!`})
}

async function backendStack(projectName,projectType,language){
    const projectDirectory = path.join(process.cwd(), projectName);

    // Validate the project name
    try {
        await fs.mkdirp(projectDirectory); // Create the project directory
        process.chdir(projectDirectory); // Change to the project directory

        let initCommand;
        switch (projectType.toLowerCase()) {
            case 'blank project':
                initCommand = language === 'Typescript'
                    ? `npx tsc --init` // Initialize TypeScript in a blank project
                    : `echo "console.log('Hello, World!');" > index.js`; // Create a simple JS file
                break;
            case 'node-express (mongodb)':
                initCommand = language === 'Typescript'
                    ? `npx express-generator-typescript . --no-view && npm i mongodb mongoose` // Create Express app with TypeScript
                    : `npx express-generator . --no-view && npm i mongodb mongoose`; // Create Express app with JavaScript
                break;
            case 'node-express (firebase)':
                initCommand = language === 'Typescript'
                    ? `npx express-generator-typescript . --no-view && npm install firebase` // Create and set up Firebase with TypeScript
                    : `npx express-generator . --no-view && npm install firebase`; // Create and set up Firebase with JavaScript
                break;
            default:
                console.error('Unsupported project type specified.');
                return;
        }

        // Run the initialization command
        exec(initCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error creating project: ${error.message}`);
                return;
            }
            console.log(`Creating project ${projectType} for you in ${language}\n`, projectName);
            console.log(`Project created successfully:\n${stdout}`);
            if (stderr) {
                console.error(`Error output: ${stderr}`);
            }
        });
    } catch (error) {
        console.error('Error during project setup:', error);
    }
}

export {backendStack}