import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hejka" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
    return (
        <div className="home">
            <h2>Welcome to Our Website!</h2>
            <div>
            <p>This is the home page. </p>


            <h3>Check out our sections:</h3>
            <ul>
                <li><a href="/projects">Projects</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/login">Login</a></li>
            </ul>


            </div>
        </div>
    )
}
