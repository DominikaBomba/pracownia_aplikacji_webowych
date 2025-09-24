const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let tablica = [
  ["jajka", "masło", "sól", "pieprz"],
  ["mąka", "szpinak", "ser feta", "cebula"],
];

tablica.push(losujSkladniki(tablica));

console.log("Przepisy kucharskie:D");
console.log("1. Jajecznica ");
console.log("2. Pierogi ze szpinakiem");
console.log("3. Losowe składniki - Pomieszane danie");
wybierz_numer();

function wybierz_numer() {
  rl.question(
    `Podaj numer przepisu który chcesz ugotować (1 do 3): `,
    (numer) => {
      wypisz_skladniki(numer);
    },
  );
}
function wypisz_skladniki(numer) {
  if (tablica.length < parseInt(numer)) {
    console.log("Podaj numer w zakresie 1 do 3:");
    wybierz_numer();
  } else {
    console.log("\n Składniki: ");
    for (skladnik of tablica[numer - 1]) {
      console.log("- " + skladnik);
    }
  }
}
function losujSkladniki(tablica) {
  let losowe = [];
  while (losowe.length < 4) {
    let i = Math.floor(Math.random() * tablica.length);
    let j = Math.floor(Math.random() * tablica[i].length);
    let skladnik = tablica[i][j];
    if (!losowe.includes(skladnik)) losowe.push(skladnik);
  }
  return losowe;
}
