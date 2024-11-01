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


function simpleHTML(destinationDir,projectName){
    fs.mkdirSync(destinationDir, { recursive: true });
    const source=`./templates/frontend/simpleHTML`
    const userDirectory = process.cwd();

    fs.readdir(source, (err, files) => {
        if (err) {
            console.error('Error reading source directory:', err);
            return;
        }

        // Copy each file to the destination
        files.forEach(file => {
            const srcPath = path.join(source, file);
            const destPath = path.join(destinationDir, file);

            fs.copyFile(srcPath, destPath, (err) => {
                if (err) {
                    console.error(`Error copying file ${file}:`, err);
                } else {
                    spin("Creating template for you",projectName)
                    console.log(`Copied ${file} to ${destinationDir}`);
                }
            });
        });
    });

}
async function reactJS(projectName,language){
    const projectDirectory = path.join(process.cwd(), projectName);
    try {
        await fs.mkdirp(projectDirectory); // Create the project directory
        process.chdir(projectDirectory); // Change to the project directory

        let initCommand;
        switch (language.toLowerCase()) {
            case 'javascript':
                // Example for a JavaScript project
                initCommand = 'npx create-react-app .'; // Creates a React app in the current directory
                break;
            case 'typescript':
                // Example for a TypeScript project
                initCommand = 'npx create-react-app . --template typescript';
                break;
            // Add more cases for other languages/frameworks as needed
            default:
                console.error('Unsupported language specified.');
                return;
        }

        // Run the initialization command
        exec(initCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error creating project: ${error.message}`);
                return;
            }
            spin("Creating template for you\n",projectName)
            console.log(`Project created successfully:\n${stdout}`);
            if (stderr) {
                console.error(`Error output: ${stderr}`);
            }
        });
    } catch (error) {
        console.error('Error during project setup:', error);
    }
}

async function reactNative(projectName,templateType,useExpo = false){
    const projectDirectory = path.join(process.cwd(), projectName);
    try {
        await fs.mkdirp(projectDirectory); // Create the project directory
        process.chdir(projectDirectory); // Change to the project directory

        let initCommand;
        if (useExpo) {
            // Handle Expo initialization
            switch (templateType.toLowerCase()) {
                case 'typescript':
                    initCommand = `npx create-expo-app . --template expo-template-blank-typescript`;
                    break;
                case 'tabs-typescript':
                    initCommand = `npx create-expo-app . --template expo-template-tabs-typescript`;
                    break;
                case 'javascript':
                    initCommand = `npx create-expo-app . --template expo-template-blank`;
                    break;
                case 'tabs':
                    initCommand = `npx create-expo-app . --template expo-template-tabs`;
                    break;
                default:
                    console.error('Unsupported template type specified for Expo.');
                    return;
            }
        } else {
            // Handle React Native CLI initialization
            switch (templateType.toLowerCase()) {
                case 'typescript':
                    initCommand = `npx react-native init . --template react-native-template-typescript`;
                    break;
                case 'tabs-typescript':
                    initCommand = `npx react-native init . --template react-native-template-typescript --template react-native-template-react-navigation`;
                    break;
                case 'javascript':
                    initCommand = `npx react-native init .`; // Default template is JavaScript
                    break;
                case 'tabs':
                    initCommand = `npx react-native init . --template react-native-template-react-navigation`;
                    break;
                default:
                    console.error('Unsupported template type specified.');
                    return;
            }
        }
        // Run the initialization command
        exec(initCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error creating project: ${error.message}`);
                return;
            }
            console.log(`Creating React Native template for you\n`, projectName);
            console.log(`Project created successfully:\n${stdout}`);
            if (stderr) {
                console.error(`Error output: ${stderr}`);
            }
        });
    } catch (error) {
        console.error('Error during project setup:', error);
    }
}

export {simpleHTML,reactJS,reactNative}