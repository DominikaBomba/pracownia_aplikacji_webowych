const express = require('express');
const app = express();
const port = 8080;
const mime = require("mime-types");
const fs = require("fs");
const url = require("url");
app.get('/', (req, res) =>
{
    res.send('testowanie')
})

app.get('/glowna', (req, res)=>{
    res.send("Strona główna")
})
app.get("/json", (req, res)=>{
    const json1 =
            {"imie": "Dominika",
            "nazwisko": "Bomba"};
    res.send(json1);
})
app.get("/html", (req, res)=>{
    res.send("<h1> Dominika </h1> <div> Tekst</div>")
})
app.get("/html_from_file", (req, res)=>{
    fs.readFile("./plik_testowy.html", "utf8", (err, data) => {
        res.send(data);
    })
})
app.get("/get_params", (req, res)=>{
    const parsedUrl = url.parse(req.url, true);
    res.send(parsedUrl.query);
    const json2 = {"ok": "ok"}
    res.send(json2)
    fs.writeFile(`./params_${Date.now()}.json`, JSON.stringify(parsedUrl.query), (err) => {})
})

app.use(express.static(path.join(__dirname, 'assets')));

app.use((req, res) => {
    res.status(404).send('Nie ma takiego pliku');
});


/*Dla niezdefiniowanych wcześniej ścieżek
szukaj pliku o nazwie wskazanej przez ścieżkę w folderze /assets
W przypadku znalezienia pliku zwróć go z odpowiednim typem
 MIME (np. dla /x.html zwróć plik z MIME text/html) -
 skorzystaj np z biblioteki mime-types
 (https://www.npmjs.com/package/mime-types?activeTab=readme)
W przypadku braku pliku zwróć błąd 404 w formacie
JSON. Pamiętaj o odpowiednim kodzie statusu HTTP!*/
app.listen(port, () =>{

    console.log('Port: ' + port);
})
