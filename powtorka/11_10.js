import http from "http"
import os from "os"
 import * as fs from "fs";
import {pipeline} from "stream"
import * as zlib from 'zlib'
import {readFile} from "fs/promises"
const server = http.createServer(async (req, res) => {
  
    const url = req.url;
    if(url == "//one"){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        const tekst_z_pliku = await readFile("./powtorka/test.txt");
        res.write(tekst_z_pliku);
        res.write("hejka");
    }
    else if(url == "/two"){
        res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify({'hej' : 'gek'}));

    }
     else if(url == "/three"){
        const url = req.url;
        const method = req.method;
        res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(method);

    }
         else if(url == "/four"){
        const url = req.url;
       
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(url.host);
        res.write(url.pathname);
        res.write(url.search);

    }         
    else if(url == "/five"){
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: 'user@gmail.com',
                pass: 'password'
            }
        })
        const mailOptions = {
            from: 'nadawca@gmail.com',
            to: 'odbiorca@gmail.com',
            subject : 'temat',
            text: 'tekst o tutaj idzie sobie'
            
        }
        transporter.sendMail(mailOptions, (err, info)=>{
            console.log('Email sent: ${info.response}');
        })

    }
    else if(url == "/six"){
       
        const transporter = createTransport({
            service: 'gmail',
            auth:{
                user: 'user@gmail.com',
                pass: 'password'
            }
        })
        const mailOptions = {
            from: 'nadawca@gmail.com',
            to: 'odbiorca@gmail.com',
            subject : 'temat',
            text: 'tekst o tutaj idzie sobie'
            
        }
        transporter.sendMail(mailOptions, (err, info)=>{
            console.log(`Email sent: ${info.response}`);
        })

    }
    /*
    else if (req.url === '/file-upload') {
        const formidable = require('formidable')
        const form = new formidable.IncomingForm()
        form.parse(req, async (err, fields, files) => {
        const oldPath = files.filetoupload.filepath
        const newPath = `./upload/${files.filetoupload.originalFilename}`
        await fs.rename(oldPath, newPath)
        res.statusSoce = 302
        res.setHeader('Location', '/')
        res.end()
        })
    }*/
   
    /*else if(url === "/six"){
        const formidable = require("formidable");
        const form = formidable.IncomingForm();
        form.parse(req, async (err, fields, files)=>{
            const oldPath = files.filetoupload.filepath;
            const newPath = `upload/${files.filetoupload.originalFilename}`;
           await fs.rename(oldPath, newPath);


        })
    }*/
    else if(url == "/seven"){
      async function logChunks(readable){
        for await (const chunk of readable){
            console.log(chunk);
        }
      }
      const readable = fs.createReadStream('./powtorka/test.txt', {encoding: 'utf8'});
      await logChunks(readable);

    }
                
   else if(url == "/eight"){
    res.write("arch:" + os.arch());
    res.write("constants:" + JSON.stringify(os.constants));
    res.write("cpus" + JSON.stringify(os.cpus()))

    res.write("endianness(): "+ os.endianness())
    res.write("eol: "+ os.EOL)
    
res.end();
    }
    else if(url == "/nine"){
        console.log(os.uptime())
;    }
else if(url =="/ten"){
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport(
        {
            service: "gmail", 
            auth:{
                user: "dominika@gmail.com", 
                pass: "help"
            }
        }
    )
    const mailOptions = {
        from: "domi",
        to:"misia", 
        subject:"zaden",
        text: "tekst",
        html: "<h1> tu hateemel"
    }
    transporter.sendMail(mailOptions, (err, info)=>{
        console.log(`email sent: ${info.response}`)
    })
}
/*
else if(url = "/eleven"){
    async function ReadableToString(readable){
        let result = "";
        for await(const chunk of readable){
            result += chunk
        }
        return result;
    }
  const readable = fs.createReadStream('file.txt', {encoding: utf8});

}
*/

else if(url == "/twelve"){
   

    pipeline(
        fs.createReadStream("./powtorka/test.txt"),
        fs.createWriteStream("./powtorka/przepisany.txt"), 
        (err) => {
            if(err){
                console.error("pipeline failed, ", err)
            }
            else{
                console.log("dziala");
            }
        }

    )
}
       
    
    
    res.end();
});
server.listen(8080);