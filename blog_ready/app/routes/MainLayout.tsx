import '../style.scss';
import { Outlet } from "react-router";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const API_BASE_URL = 'http://localhost:5170';

const queryClient = new QueryClient();

export const fetchPosts = async () => {
    const res = await fetch(`${API_BASE_URL}/posts`);
    if(!res.ok) throw new Error(`Błąd serwera: ${res.status}`);
    return res.json();
}

export const fetchComments = async () => {
    const res = await fetch(`${API_BASE_URL}/comments`);
    if(!res.ok) throw new Error(res.statusText);
    return res.json();
}


export default function MainLayout() {
    return (

        <QueryClientProvider client={queryClient}>
            <div>
                <header>
                    <nav className={"menu_main"}>
                        <a href="/">Home</a>
                        <a href="/wpis">Wpisy</a>
                        <a href="/kategorie">Lista Kategorii</a>
                    </nav>
                </header>
                <main>

                    <Outlet />
                </main>
            </div>
        </QueryClientProvider>
    );
}