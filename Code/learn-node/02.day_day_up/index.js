// const address = require('address');
// console.info(`ip: ${address.ip()}`);
// console.info(`ipv6: ${address.ipv6()}`);

// const markdown = require( "markdown" ).markdown;
// console.log( markdown.toHTML( "Hello *World*!" ) );

// const chalk = require('chalk');

// console.info(chalk.supportsColor);

// const log = console.log;

// // Combine styled and normal strings
// log(chalk.blue('Hello') + ' World' + chalk.red('!'));

// // Compose multiple styles using the chainable API
// log(chalk.blue.bgRed.bold('Hello world!'));

// // Pass in multiple arguments
// log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));

// // Nest styles
// log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));

// // Nest styles of the same type even (color, underline, background)
// log(chalk.green(
// 	'I am a green line ' +
// 	chalk.blue.underline.bold('with a blue substring') +
// 	' that becomes green again!'
// ));

// // ES2015 template literal
// log(`
// CPU: ${chalk.red('90%')}
// RAM: ${chalk.green('40%')}
// DISK: ${chalk.yellow('70%')}
// `);

// // ES2015 tagged template literal
// log(chalk`
// CPU: {red ${cpu.totalPercent}%}
// RAM: {green ${ram.used / ram.total * 100}%}
// DISK: {rgb(255,131,0) ${disk.used / disk.total * 100}%}
// `);

// // Use RGB colors in terminal emulators that support it.
// log(chalk.keyword('orange')('Yay for orange colored text!'));
// log(chalk.rgb(123, 45, 67).underline('Underlined reddish color'));
// log(chalk.hex('#DEADED').bold('Bold gray!'));

// const emoji = require('emoji');
// console.info('😎', emoji.unifiedToHTML('😎'));

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.exmail.qq.com',
    port: 465, // SMTP 端口
    secure: true, // 使用 SSL
    auth: {
        user: '*******@raycloud.com',
        pass: '*****'
    }
});

let mailOptions = {
    from: '*******@raycloud.com', // 发件地址
    to: '******@qq.com', // 收件列表
    subject: 'Hello World', // 标题
    //text和html两者只支持一种
    text: 'Hello World ?', // 标题
    html: '<b>Hello World ?</b>' // html 内容
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.info(error);
    }
    console.info('Message sent: ' + info.response);

});





