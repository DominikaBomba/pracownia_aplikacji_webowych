import {Outlet} from "react-router";
export default function MainLayout() {



        return (
            <main className="container">
                <article className="post-card" id="1">
                    <h3>Wpis 1 – Podstawy Reacta</h3>
                    <p className="post-meta">Kategoria: React • 10.01.2026</p>
                    <p>
                        React to biblioteka JavaScript służąca do budowania interfejsów użytkownika.
                        Umożliwia tworzenie aplikacji opartych na komponentach.
                    </p>
                </article>

                <article className="post-card" id="2">
                    <h3>Wpis 2 – React Router</h3>
                    <p className="post-meta">Kategoria: React Router • 11.01.2026</p>
                    <p>
                        React Router pozwala tworzyć wielostronicowe aplikacje typu SPA
                        bez przeładowywania strony.
                    </p>
                </article>

                <article className="post-card" id="3">
                    <h3>Wpis 3 – Stylowanie w SCSS</h3>
                    <p className="post-meta">Kategoria: SCSS • 12.01.2026</p>
                    <p>
                        SCSS to preprocesor CSS, który ułatwia pracę ze stylami
                        dzięki zmiennym i zagnieżdżeniom.
                    </p>
                </article>


            </main>
        );


}