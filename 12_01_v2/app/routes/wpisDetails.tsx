// PostDetail.js
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {Link} from "react-router";

export default function wpisDetails() {
    const [isLoading, setIsLoading] = useState(false);
    const[isError, setIsError] = useState(false);
    const { id } = useParams();
    const [p, setPost] = useState(null);
const [comments, setComments] = useState([]);
    useEffect(() => {

        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => res.json())
            .then(data => setPost(data));
    }, [id]);
    useEffect(() => {
        setIsLoading(true);
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(response => response.json())
            .then(json => setComments(json)).catch(err => setIsError(err)).finally(() => setIsLoading(false));

    }, [])
    if (!p) return <p>Ładowanie...</p>;

    return (
        <div>
            <h3>{p.title}</h3>


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

        </div>
    );
}