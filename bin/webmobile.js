// commander.js，可以自动的解析命令和参数，用于处理用户输入的命令。
// download-git-repo，下载并提取 git 仓库，用于下载项目模板。
// Inquirer.js，通用的命令行用户界面集合，用于和用户进行交互。
// handlebars.js，模板引擎，将用户提交的信息动态填充到文件中。
// ora，下载过程久的话，可以用于显示下载中的动画效果。
// chalk，可以给终端的字体加上颜色。
// log-symbols，可以在终端上显示出 √ 或 × 等的图标。

const program = require("commander");
const inquirer = require("inquirer");
const download = require("download-git-repo");
const fs = require('fs');
const handlebars = require("handlebars");
const ora = require('ora');
const symbols = require('log-symbols');
const chalk = require('chalk');

const gitRepositoryUrl = 'https://github.com/mmddgg/webMobile-cli.git';


program
    .version('0.1.0' , "-v, --version")
    .command('init <name>')
    .action(function(name){
        if(fs.existsSync(name)){
            // 错误提示项目已存在，避免覆盖原有项目
            console.log(symbols.error, chalk.red('该名称项目已存在!'));
            return false;
        }
        inquirer
            .prompt([
                {
                    type:'input',name:'author',
                    message:'Pls input name with author.'
                },
                {
                    type:'input',name:'description',
                    message:'Pls description name with this project.'
                },
                {
                    type:'input',name:'authorEmail',
                    message:'Pls input email with author.'
                }
            ])
            .then(function(answers){
                console.log(answers);
                const tipMesg = ora("正在下载模板文件...");
                const dirPath = process.cwd();
                download(`direct:${gitRepositoryUrl}` , `${dirPath}/../${name}` ,{clone:true} , function(err){
                    if(err){
                        tipMesg.fail();
                        console.log(symbols.error,chalk.red(err));
                        return ;
                    }
                    tipMesg.succeed();
                    console.log(symbols.success,chalk.green('模板文件下载成功。'));
                    const meta = {
                        name ,
                        author:answers.author,
                        description:answers.description
                    };
                    const template = `${dirPath}/bin/packageTemplate.json`;
                    const fileName = `${dirPath}/../${name}/package.json`;
                    if(fs.existsSync(fileName)){
                        const content = fs.readFileSync(template).toString();
                        const result = handlebars.compile(content)(meta);
                        fs.writeFileSync(fileName,result);
                    }
                    console.log(symbols.success,chalk.green('项目初始化完成。'));
                })
            });
    });
program.parse(process.argv);


