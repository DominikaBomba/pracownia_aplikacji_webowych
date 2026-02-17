import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsxs("main", {
    className: "container",
    children: [/* @__PURE__ */ jsxs("nav", {
      className: "menu_main",
      children: [/* @__PURE__ */ jsx("a", {
        href: "/",
        children: "Home"
      }), " ", /* @__PURE__ */ jsx("a", {
        href: "/wpis",
        children: "Wpisy"
      }), " ", /* @__PURE__ */ jsx("a", {
        href: "/kategorie",
        children: "Lista Kategorii"
      })]
    }), /* @__PURE__ */ jsx("h2", {
      children: "Najnowsze wpisy"
    }), /* @__PURE__ */ jsx("p", {
      children: " Tekst wygenerowany chatemGpt, ale styl zrobiłam sama:D"
    }), /* @__PURE__ */ jsxs("article", {
      className: "post-card",
      children: [/* @__PURE__ */ jsx("h3", {
        children: "Jak zacząć z Reactem"
      }), /* @__PURE__ */ jsx("p", {
        children: "Krótki opis wpisu o podstawach Reacta..."
      }), /* @__PURE__ */ jsx("a", {
        href: "/post/1",
        children: "Czytaj więcej"
      })]
    }), /* @__PURE__ */ jsxs("article", {
      className: "post-card",
      children: [/* @__PURE__ */ jsx("h3", {
        children: "React Router w praktyce"
      }), /* @__PURE__ */ jsx("p", {
        children: "Jak tworzyć wielostronicowe aplikacje SPA..."
      }), /* @__PURE__ */ jsx("a", {
        href: "/post/2",
        children: "Czytaj więcej"
      })]
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home
}, Symbol.toStringTag, { value: "Module" }));
const MainLayout = UNSAFE_withComponentProps(function MainLayout2() {
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("header", {
      children: /* @__PURE__ */ jsxs("nav", {
        className: "menu_main",
        children: [/* @__PURE__ */ jsx("a", {
          href: "/",
          children: "Home"
        }), " ", /* @__PURE__ */ jsx("a", {
          href: "/wpis",
          children: "Wpisy"
        }), " ", /* @__PURE__ */ jsx("a", {
          href: "/kategorie",
          children: "Lista Kategorii"
        })]
      })
    }), /* @__PURE__ */ jsx("main", {
      children: /* @__PURE__ */ jsx(Outlet, {})
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MainLayout
}, Symbol.toStringTag, { value: "Module" }));
const wpis = UNSAFE_withComponentProps(function MainLayout3() {
  return /* @__PURE__ */ jsxs("main", {
    className: "container",
    children: [/* @__PURE__ */ jsxs("article", {
      className: "post-card",
      id: "1",
      children: [/* @__PURE__ */ jsx("h3", {
        children: "Wpis 1 – Podstawy Reacta"
      }), /* @__PURE__ */ jsx("p", {
        className: "post-meta",
        children: "Kategoria: React • 10.01.2026"
      }), /* @__PURE__ */ jsx("p", {
        children: "React to biblioteka JavaScript służąca do budowania interfejsów użytkownika. Umożliwia tworzenie aplikacji opartych na komponentach."
      })]
    }), /* @__PURE__ */ jsxs("article", {
      className: "post-card",
      id: "2",
      children: [/* @__PURE__ */ jsx("h3", {
        children: "Wpis 2 – React Router"
      }), /* @__PURE__ */ jsx("p", {
        className: "post-meta",
        children: "Kategoria: React Router • 11.01.2026"
      }), /* @__PURE__ */ jsx("p", {
        children: "React Router pozwala tworzyć wielostronicowe aplikacje typu SPA bez przeładowywania strony."
      })]
    }), /* @__PURE__ */ jsxs("article", {
      className: "post-card",
      id: "3",
      children: [/* @__PURE__ */ jsx("h3", {
        children: "Wpis 3 – Stylowanie w SCSS"
      }), /* @__PURE__ */ jsx("p", {
        className: "post-meta",
        children: "Kategoria: SCSS • 12.01.2026"
      }), /* @__PURE__ */ jsx("p", {
        children: "SCSS to preprocesor CSS, który ułatwia pracę ze stylami dzięki zmiennym i zagnieżdżeniom."
      })]
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: wpis
}, Symbol.toStringTag, { value: "Module" }));
function Categories() {
  return /* @__PURE__ */ jsxs("main", {
    className: "container",
    children: [/* @__PURE__ */ jsx("h2", {
      children: "Kategorie"
    }), /* @__PURE__ */ jsxs("ul", {
      className: "category-list",
      children: [/* @__PURE__ */ jsx("li", {
        children: "React"
      }), /* @__PURE__ */ jsx("li", {
        children: "JavaScript"
      }), /* @__PURE__ */ jsx("li", {
        children: "Frontend"
      }), /* @__PURE__ */ jsx("li", {
        children: "CSS / SCSS"
      })]
    })]
  });
}
const kategorie = UNSAFE_withComponentProps(Categories);
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: kategorie
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BmDBpHZU.js", "imports": ["/assets/chunk-EPOLDU6W-Wp3N_t67.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-C5bd1u2I.js", "imports": ["/assets/chunk-EPOLDU6W-Wp3N_t67.js"], "css": ["/assets/root-BrAzMOzt.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-CO1K0xg6.js", "imports": ["/assets/chunk-EPOLDU6W-Wp3N_t67.js"], "css": ["/assets/style-D6aSt3NY.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/MainLayout": { "id": "routes/MainLayout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/MainLayout-gCzUaH42.js", "imports": ["/assets/chunk-EPOLDU6W-Wp3N_t67.js"], "css": ["/assets/style-D6aSt3NY.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/wpis": { "id": "routes/wpis", "parentId": "routes/MainLayout", "path": "wpis", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/wpis-BHkqfJZn.js", "imports": ["/assets/chunk-EPOLDU6W-Wp3N_t67.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/kategorie": { "id": "routes/kategorie", "parentId": "routes/MainLayout", "path": "kategorie", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/kategorie-egyvzwqb.js", "imports": ["/assets/chunk-EPOLDU6W-Wp3N_t67.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-a35c304c.js", "version": "a35c304c", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_subResourceIntegrity": false, "unstable_trailingSlashAwareDataRequests": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/MainLayout": {
    id: "routes/MainLayout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/wpis": {
    id: "routes/wpis",
    parentId: "routes/MainLayout",
    path: "wpis",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/kategorie": {
    id: "routes/kategorie",
    parentId: "routes/MainLayout",
    path: "kategorie",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  }
};
const allowedActionOrigins = false;
export {
  allowedActionOrigins,
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
