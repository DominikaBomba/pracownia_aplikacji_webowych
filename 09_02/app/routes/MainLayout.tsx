import '../style.scss';
import {Outlet} from "react-router";
export const fetchPosts = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    if(!res.ok) {
        throw new Error(res.statusText);
    }
    return res.json();
}

export const fetchComments = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments');
    if(!res.ok) {
        throw new Error(res.statusText);

    }
    return res.json();
}



export default function MainLayout() {
    return (
        <div>
            <header>

                <nav className={"menu_main"}>
                    <a href="/">Home</a> <a href="/wpis">Wpisy</a> <a href="/kategorie">Lista Kategorii</a>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );

}