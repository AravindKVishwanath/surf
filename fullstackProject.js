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


async function fullstackProject(projectName, projectType, language) {
    const projectDirectory = path.join(process.cwd(), projectName);

    // Validate the project name
    try {
        await fs.mkdirp(projectDirectory); // Create the project directory
        process.chdir(projectDirectory); // Change to the project directory

        let initCommand;
        switch (projectType.toLowerCase()) {
            case 'simple express template':
                initCommand = language === 'typescript'
                    ? `npx express-generator-typescript . --no-view`
                    : `npx express-generator . --no-view`;
                break;

            case 'mern stack':
                // Create the basic setup for a MERN stack
                initCommand = language === 'typescript'
                    ? `npx create-react-app ${projectName}-client --template typescript && mkdir ${projectName}-server && cd ${projectName}-server && npm init -y && npm install express mongoose cors dotenv && npx tsc --init`
                    : `npx create-react-app ${projectName}-client && mkdir ${projectName}-server && cd ${projectName}-server && npm init -y && npm install express mongoose cors dotenv`;
                break;

            case 'next.js':
                initCommand = language === 'typescript'
                    ? `npx create-next-app@latest ${projectName} --typescript`
                    : `npx create-next-app@latest ${projectName}`;
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
            console.log(`Creating ${projectType} in ${language}...\n`, projectName);
            console.log(`Project created successfully:\n${stdout}`);
            if (stderr) {
                console.error(`Error output: ${stderr}`);
            }
        });
    } catch (error) {
        console.error('Error during project setup:', error);
    }
}

export {fullstackProject}