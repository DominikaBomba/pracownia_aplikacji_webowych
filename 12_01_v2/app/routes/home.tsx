import type { Route } from "./+types/home";

import '../style.scss';

export default function Home() {
    return (
        <main className="container">

            <nav className={"menu_main"}>
                <a href="/">Home</a> <a href="/wpis">Wpisy</a> <a href="/kategorie">Lista Kategorii</a>
            </nav>
            <h2>Najnowsze wpisy</h2>
            <p> Tekst wygenerowany chatemGpt, ale styl zrobiłam sama:D
            </p>
            <article className="post-card">
                <h3>Jak zacząć z Reactem</h3>
                <p>Krótki opis wpisu o podstawach Reacta...</p>
                <a href="/post/1">Czytaj więcej</a>
            </article>

            <article className="post-card">
                <h3>React Router w praktyce</h3>
                <p>Jak tworzyć wielostronicowe aplikacje SPA...</p>
                <a href="/post/2">Czytaj więcej</a>
            </article>

        </main>
    );
}