import {Link, Outlet} from "react-router";
import {useEffect, useState} from "react";
import type {Post} from "~/Post";

export default function MainLayout() {
    const [isLoading, setIsLoading] = useState(false);
    const[isError, setIsError] = useState(false);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);


    useEffect(() => {
        setIsLoading(true);
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => setPosts(json)).catch(err => setIsError(err)).finally(() => setIsLoading(false));

    }, [])

    useEffect(() => {
        setIsLoading(true);
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(response => response.json())
            .then(json => setComments(json)).catch(err => setIsError(err)).finally(() => setIsLoading(false));

    }, [])


        return (


            <main className="container">
                {
                    posts.map(p=>(

                        <article className="post-card" key={p.id}>
                            <h3>{p.title}</h3>
                            <Link to={`/wpis/${p.id}`}>Zobacz szczegóły...</Link>

                            <p>
                                {p.body}
                            </p>

                            <h4> Komentarze: </h4>
                            <p className="comments-post">

                                {comments
                                    .filter(comment => comment.postId === p.id)
                                    .map(comment =>(
                                        <p key={comment.id}> {comment.name} </p>
                                    ))
                                }


                            </p>

                        </article>
                    ))
                }

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