import { type RouteConfig,
    index, route, layout
} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),

    route("login", "routes/login.tsx"),

    layout("routes/MainLayout.tsx", [
        route("about", "routes/aboutus.tsx"),
        route("projects", "routes/projects.tsx")])

] satisfies RouteConfig;
