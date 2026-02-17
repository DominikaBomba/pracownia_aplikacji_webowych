import { type RouteConfig, index, route , layout} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    layout("routes/MainLayout.tsx", [
    route("wpis", "routes/wpis.tsx"),
    route("kategorie", "routes/kategorie.tsx"),
    route("wpis/:id", "routes/wpisDetails.tsx"),
        ])


] satisfies RouteConfig;
