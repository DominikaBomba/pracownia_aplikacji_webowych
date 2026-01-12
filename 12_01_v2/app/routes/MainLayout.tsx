import '../style.scss';
import {Outlet} from "react-router";
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