import {Link, Outlet} from "react-router";
import {useEffect, useState} from "react";
import type {Post} from "~/Post";
import type {Comment} from "~/Comment";
import {fetchPosts} from "~/routes/MainLayout";
import {fetchComments} from "~/routes/MainLayout";

import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
interface WpisyProps {
    id_posta?: number;
}

export function Wpisy({id_posta} : WpisyProps) {
    const query = useQuery<Post[]>({
        queryKey: ['wpisy'],
        queryFn: fetchPosts
    });
    const query2 = useQuery<Comment[]>({
        queryKey: ['komentarze'],
        queryFn: fetchComments
    });
    if (query.isLoading || query2.isLoading) return <div>Ładowanie...</div>;
    if (query.isError || query2.isError) return <div>Błąd pobierania danych</div>;
    const filteredPosts = id_posta ? query.data?.filter(p => p.id === id_posta) : query.data;

    return (
        <div className="posts-grid">
            {filteredPosts?.map((wpis: Post) => (
                <article key={wpis.id} className="post-card">
                    <div className="post-content">
                        <h3>{wpis.title}</h3>
                        <p>{wpis.body}</p>
                        <Link to={`./${wpis.id}`}>Wyświetl więcej...</Link>
                    </div>

                    <section className="comments-section">
                        <h4>Komentarze</h4>
                        <div className="comments-list">
                            {query2.data?.filter((comment: Comment) => comment.id === wpis.id).map((comment: Comment) => (
                                <div key={comment.postId} className="comment-item">
                                    {comment.body}
                                </div>
                            ))}
                        </div>
                    </section>
                </article>
            ))}
        </div>
    );
}


export default function MainLayout() {

        return (


            <main className="container">
                <Wpisy></Wpisy>

            </main>
        );


}