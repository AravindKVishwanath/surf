#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import { simpleHTML,reactJS,reactNative} from './frontend.js';
import { backendStack } from './backendStack.js';
import { fullstackProject } from './fullstackProject.js';

let projectName,language;

async function spin(loader,ans) {
    const spinner = createSpinner(`${loader}`).start()
    await sleep()
    spinner.success({text:`You chose ${ans}\n Please wait while the project is being initialized`})
}

const sleep = (ms=2000) => new Promise((r)=>setTimeout(r,ms))

async function frontend() {
    const answers = await inquirer.prompt({
        name:"frontend",
        type:"list",
        message:"Choose any one, simple HTML, React or React Native",
        choices:[
            "Simple HTML",
            "React.js",
            "React Native",
            "React Native Tabs",
            "React Native (Expo)",
            "React Native Tabs (Expo)"
        ]
    })
    const spinner = createSpinner("Moving to next Steps....").start()
    await sleep()
    spinner.success({text:`You chose ${answers.frontend}`})
    if(answers.frontend==="Simple HTML"){
        simpleHTML(`./${projectName}`,projectName)
    }else if(answers.frontend==="React.js" && language==="JavaScript"){
        reactJS(`./${projectName}`,"JavaScript")
    }else if(answers.frontend==="React.js" && language==="TypeScript"){
        reactJS(`./${projectName}`,"TypeScript")
    }else if(answers.frontend==="React Native" && language==="JavaScript"){
        reactNative(projectName,"javascript")
    }else if(answers.frontend==="React Native" && language==="TypeScript"){
        reactNative(projectName,"typescript")
    }else if(answers.frontend==="React Native (Expo)" && language==="JavaScript"){
        reactNative(projectName,"javascript",true)
    }else if(answers.frontend==="React Native (Expo)" && language==="TypeScript"){
        reactNative(projectName,"typescript",true)
    }else if(answers.frontend==="React Native Tabs" && language==="JavaScript"){
        reactNative(projectName,"tabs")
    }else if(answers.frontend==="React Native Tabs" && language==="TypeScript"){
        reactNative(projectName,"tabs-typescript")
    }else if(answers.frontend==="React Native Tabs (Expo)" && language==="JavaScript"){
        reactNative(projectName,"tabs",true)
    }else if(answers.frontend==="React Native Tabs (Expo)" && language==="TypeScript"){
        reactNative(projectName,"tabs-typescript",true)
    }

}
async function backend() {
    const answers = await inquirer.prompt({
        name:"backend",
        type:"list",
        message:"Choose any one, Blank Project, Node-Express (MongoDB), Node-Express (Firebase)",
        choices:[
            "Blank Project",
            "Node-Express (MongoDB)",
            "Node-Express (Firebase)"
        ]
    })
    const spinner = createSpinner("Moving to next Steps....").start()
    await sleep()
    spinner.success({text:`You chose ${answers.backend}`})

    if(answers.backend==="Blank Project"){
        backendStack(projectName,"blank project",language)
    }else if(answers.backend==="Node-Express (MongoDB)"){
        backendStack(projectName,"node-express (mongodb)",language)
    }else if(answers.backend==="Node-Express (Firebase)"){
        backendStack(projectName,"node-express (firebase)",language)
    }
}
async function fullstack() {
    const answers = await inquirer.prompt({
        name:"fullstack",
        type:"list",
        message:"Choose any one, Simple express template, MERN stack or Next.js",
        choices:[
            "Simple Express template",
            "MERN stack",
            "Next.js"
        ]
    })
    const spinner = createSpinner("Moving to next Steps....").start()
    await sleep()
    spinner.success({text:`You chose ${answers.fullstack}`})

    if(answers.fullstack==="Simple Express template"){
        fullstackProject(projectName,"simple express template",language)
    }else if(answers.fullstack==="MERN stack"){
        fullstackProject(projectName,"mern stack",language)
    }else if(answers.fullstack==="Next.js"){
        fullstackProject(projectName,"next.js",language)
    }
}

async function handle_frontend_backend(answer) {
    const spinner = createSpinner("Moving to next Steps....").start()
    await sleep()
    spinner.success({text:`You chose ${answer}`})
    if(answer==="Frontend Project"){
        frontend()
    }else if(answer==="Backend Project"){
        backend()
    }else if(answer==="Full Stack Project"){
        fullstack()
    }
}



async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        "Which Project do you want to start Today?"
    )
    await sleep()
    rainbowTitle.stop()

    console.log(`
        ${chalk.bgBlue('Welcome to SURF')}
        I will help you set up the boilerplate for your project
        
        `)
}

async function askProjectName(){
    const projectNames = await inquirer.prompt({
        name:"project_name",
        type:"input",
        message:"What is the project name?",
        default(){
            return "New-Project";
        }
    })
    const languages = await inquirer.prompt({
        name:"language",
        type:"list",
        message:"JavaScript or Typescript?",
        choices:[
            "JavaScript",
            "TypeScript"
        ]
    })
    language = languages.language
    projectName = projectNames.project_name
}

async function frontend_backend() {
    const answers = await inquirer.prompt({
        name:"frontend_backend",
        type:"list",
        message:"Choose any one, Frontend, Backend or Full Stack Development",
        choices:[
            "Frontend Project",
            "Backend Project",
            "Full Stack Project"
        ]
    })

    return handle_frontend_backend(answers.frontend_backend)
}




await welcome()
await askProjectName()
await frontend_backend()