import type { Route } from "./+types/home";

import '../style.scss';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import type {Post} from "~/Post";
import type {Comment} from "~/Comment";
const client = new QueryClient();
export default function Home() {
    return (
        <QueryClientProvider client={client}>
            <main className="posts-grid">

                <nav className={"menu_main"}>
                    <a href="/">Home</a> <a href="/wpis">Wpisy</a> <a href="/kategorie">Lista Kategorii</a>
                </nav>

                <article className="post-card">
                    <div className="post-content">
                        <h3>Jak zacząć z Reactem</h3>
                        <p>Krótki opis wpisu o podstawach Reacta...</p>
                        <a href="/wpis">Czytaj więcej</a>
                    </div>
                </article>

                <article className="post-card">
                    <div className="post-content">
                    <h3>React Router w praktyce</h3>
                    <p>Jak tworzyć wielostronicowe aplikacje SPA...</p>
                    <a href="/wpis">Czytaj więcej</a>
                    </div>
                </article>

            </main>
        </QueryClientProvider>
    );
}