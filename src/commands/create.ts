import { prompt } from 'inquirer'
import { checkDirectory, copy } from '../utils'
import fs from 'fs'

const cwd = process.cwd() + '/'
const Create = ()=> {    
    const promptList = [
        {
            type: 'input',
            name: 'name',
            message: 'Set your project name: ',
            default: 'my-project'
        },
        {
            type: 'input',
            name: 'version',
            message: 'Set your project version: ',
            default: '1.0.0'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Set your project description: ',
            default: 'description'
        },
        {
            type: 'input',
            name: 'keywords',
            message: "Set your project keywords (Separated by spaces): ",
            default : 'key'
        },
        {
            type: 'list',
            name: 'frame',
            message: 'Choose your frame: ',
            choices: ['react-init']
        }
    ]
    
    prompt(promptList).then( ( { name, version, description, keywords, frame })=>{
        const input = cwd+'dist/templist/'+ frame
        new Promise(res=> {
            checkDirectory(input ,cwd + name, copy )
            res()
        }).then(()=>{
            const packagePath = input + '/package.json'
            let _package  = require(packagePath)
            const  newPackage = { ..._package,  name, version, description, keywords}

            fs.writeFileSync(packagePath, JSON.stringify(newPackage, null, 4), 'utf-8')
        })
    })
    
}


export default Create