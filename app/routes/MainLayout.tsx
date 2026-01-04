import {Outlet} from "react-router";
export default function MainLayout() {
    return (
        <div>
            <header>
                <h1>My Website</h1>
                <nav>
                    <a href="/">Home</a> | <a href="/projects">Projects</a> | <a href="/about">About Us</a> | <a href="/login">Login</a>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );

}