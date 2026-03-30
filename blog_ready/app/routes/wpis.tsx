import { Link } from "react-router";
import { useState } from "react";
import type { Post } from "~/Post";
import type { Comment } from "~/Comment";
import { fetchPosts, fetchComments } from "~/routes/MainLayout";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {useParams} from "react-router-dom";
import {id} from "effect/Fiber";
interface WpisyProps { id_posta?: number; }

export default function Wpisy() {
    const {id} = useParams<{id: string}>();
    const id_posta = id;
    const queryClient = useQueryClient();

    // Stany dla formularza
    const [newCommentName, setNewCommentName] = useState("");
    const [newCommentEmail, setNewCommentEmail] = useState("");

    // 1. Pobieranie postów i komentarzy
    const { data: posts, isLoading: pLoading } = useQuery<Post[]>({
        queryKey: ['wpisy'],
        queryFn: fetchPosts
    });

    const { data: comments, isLoading: cLoading } = useQuery<Comment[]>({
        queryKey: ['komentarze'],
        queryFn: fetchComments
    });

    const mutation = useMutation({
        mutationFn: async (payload: { name: string; email: string; postId: number }) => {
            const res = await fetch('http://localhost:5170/comments', { // Upewnij się, że port to 3000
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error("Błąd zapisu na serwerze");
            return res.json();
        },
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ['komentarze'] });
            setNewCommentName("");
            setNewCommentEmail("");
        }
    });

    if (pLoading || cLoading) return <div>Ładowanie danych...</div>;

    // Filtrowanie jeśli jesteśmy na podstronie konkretnego wpisu
    const displayedPosts = id_posta ? posts?.filter(p => p.id == Number(id_posta)) : posts;
    const handleSend = (postId: number) => {
        if (!newCommentName || !newCommentEmail) return alert("Wypełnij oba pola!");
        mutation.mutate({ name: newCommentName, email: newCommentEmail, postId });
    };

    return (
        <div className="posts-grid">
            {displayedPosts?.map((wpis: Post) => (
                <article key={wpis.id} className="post-card">
                    <div className="post-content">
                        <h3>{wpis.title}</h3>
                        <p>{wpis.body}</p>

                        {id_posta ? (


                            <div className="add-comment-form">
                                <hr />
                                <h5>Dodaj komentarz:</h5>
                                <input
                                    placeholder="Twoje Imię / Treść"
                                    value={newCommentName}
                                    onChange={(e) => setNewCommentName(e.target.value)}
                                />
                                <input
                                    placeholder="Twój Email"
                                    value={newCommentEmail}
                                    onChange={(e) => setNewCommentEmail(e.target.value)}
                                />
                                <button
                                    onClick={() => handleSend(Number(wpis.id))}
                                    disabled={mutation.isPending}
                                >
                                    {mutation.isPending ? "Wysyłanie..." : "Wyślij komentarz"}
                                </button>
                            </div>

                            ):(
                            <Link to={`/wpis/${wpis.id}`}>Wyświetl więcej...</Link>
                            )
                        }


                    </div>

                    <section className="comments-section">
                        <h4>Komentarze:</h4>
                        <div className="comments-list">
                            {comments?.filter(c => c.postId === wpis.id).map(comment => (
                                <div key={comment.id} className="comment-item">
                                    <strong>{comment.email}</strong>: {comment.name}
                                </div>
                            ))}
                        </div>
                    </section>
                </article>
            ))}
        </div>
    );


}