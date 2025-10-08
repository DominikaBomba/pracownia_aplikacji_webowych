let http = require('http');
const fs = require('fs');
const path = require('path')
const url = require("url")
http.createServer(function (req, res) {

    if(req.url === '/strona') {
        res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
        res.write('Strona Główna');
        res.end();

    }
   else if(req.url === '/json') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const imie = "Dominika";
        const nazwisko = "Bomba";
        res.end(JSON.stringify({
        imie, nazwisko

        }, null, 2));

    }
    else if(req.url === '/html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const imie = "Dominika";
        const nazwisko = "Bomba";
        res.end("<h1> Dominika </h1>" +
            "<h2> Bomba</h2>"
        );


    }
    else if(req.url === '/html2') {
        const filepath = path.join(__dirname , 'myfile.html');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile(filepath, 'utf8', (err, data) => {

            res.end( data);
        });

        
    }
   else if (req.url.startsWith("/get_params") && req.method === "GET") {
    const parsedUrl = url.parse(req.url, true);
    const params = parsedUrl.query;

    
    console.log("Otrzymane parametry GET:\n");
    console.log(JSON.stringify(params, null, 2) + "\n");

    const timestamp = Date.now();
    const filename = `params_${timestamp}.json`;

    fs.writeFile(filename, JSON.stringify(params, null, 2), () => {
           res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
           console.log(path.resolve(filename));
            console.log(`Nazwa pliku: ${filename}`);
            res.write(`nazwa pliku ${filename}`);

        
            res.end(JSON.stringify({ok: "ok"}));
    });
}


}).listen(8080);