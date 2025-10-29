const express = require('express')
const app = express()
const port = 8080
const fs = require('fs')
const url = require('url')
app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded({ extended: true }));

function writehtml(title, content, header) {
    const html_file = fs.readFileSync('./static/plik.html', 'utf8');
    return html_file
        .replace('{{title}}', title)
        .replace('{{content}}', content)
        .replace('{{header}}', header);
}

app.get('/', (req, res) => {
    res.send(writehtml("<h1>Strona główna</h1>",
        "<p>Piekarnia to miejsce, gdzie każdego dnia unosi się zapach świeżo wypiekanego chleba, bułek i ciast. </p> <p>Rzemieślnicy z pasją łączą tradycję z nowoczesnością, tworząc wypieki, które cieszą podniebienie i serce.</p>", "Strona główna"))
})

app.get('/o-nas', (req, res) => {

    const content = `
        <p>Piekarnia to miejsce, gdzie każdego dnia unosi się zapach świeżo wypiekanego chleba, bułek i ciast.</p>
        <p>Rzemieślnicy z pasją łączą tradycję z nowoczesnością, tworząc wypieki, które cieszą podniebienie i serce.</p>

        <div>
            <img src="i1.png" alt="zdjęcie">
            <img src="i1.png" alt="zdjęcie">
            <img src="i2.png" alt="zdjęcie">
        </div>

        <table border="1" cellpadding="8" cellspacing="0">
            <tr><th>Usługa IT</th><th>Cena</th></tr>
            <tr><td>Tworzenie stron internetowych</td><td>1500 zł</td></tr>
            <tr><td>Administracja serwerami</td><td>1000 zł/miesiąc</td></tr>
            <tr><td>Audyt bezpieczeństwa</td><td>2000 zł</td></tr>
        </table>
    `;
    res.send(writehtml("O nas",
        content
        , '<h1> O firmie</h1>'))
})

app.get('/oferta', (req, res) => {
    const title = '<h1>Oferta</h1>';
    const content = `
        <p>Piekarnia to miejsce, gdzie każdego dnia unosi się zapach świeżo wypiekanego chleba, bułek i ciast.</p>
        <p>Rzemieślnicy z pasją łączą tradycję z nowoczesnością, tworząc wypieki, które cieszą podniebienie i serce.</p>
        <table border="1" cellpadding="8" cellspacing="0">
            <tr><th>Usługa IT</th><th>Cena</th></tr>
            <tr><td>Tworzenie stron internetowych</td><td>1500 zł</td></tr>
            <tr><td>Administracja serwerami</td><td>1000 zł/miesiąc</td></tr>
            <tr><td>Audyt bezpieczeństwa</td><td>2000 zł</td></tr>
        </table>
    `;
    res.send(writehtml(title, content, "Oferta"));
});

app.get('/kontakt', (req, res) => {
    const content = `
        <form action="/kontakt" method="POST">
            <label for="imie">Imię:</label><br />
            <input type="text" id="imie" name="imie"  /><br /><br />

            <label for="nazwisko">Nazwisko:</label><br />
            <input type="text" id="nazwisko" name="nazwisko"  /><br /><br />

            <label for="email">Email:</label><br />
            <input type="email" id="email" name="email"  /><br /><br />

            <label for="wiadomosc">Treść wiadomości:</label><br />
            <textarea id="wiadomosc" name="wiadomosc" rows="5" ></textarea><br /><br />

            <button type="submit">Wyślij</button>
        </form>
    `;
    res.send(writehtml("Kontakt", content, "Kontakt"));
})
app.post('/kontakt', function (req, res) {
    console.log(req.body);
    res.redirect('/'); 
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})