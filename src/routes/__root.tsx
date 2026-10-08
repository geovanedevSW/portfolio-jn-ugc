import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";

const SITE_URL = "https://jhenifernogueira.com.br";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>

        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Página não encontrada
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>

        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error(error);

  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Não foi possível carregar esta página
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Ocorreu um erro inesperado. Tente novamente ou volte para a página
          inicial.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Tentar novamente
          </button>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },

      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },

      {
        title: "Jhenifer Nogueira | UGC Creator",
      },

      {
        name: "description",
        content:
          "Conteúdos autênticos e estratégicos que conectam marcas e pessoas. Conheça o portfólio UGC de Jhenifer Nogueira.",
      },

      // Open Graph
      {
        property: "og:title",
        content: "Jhenifer Nogueira | UGC Creator",
      },

      {
        property: "og:description",
        content:
          "Conteúdos UGC autênticos e estratégicos criados para aproximar marcas e pessoas.",
      },

      {
        property: "og:type",
        content: "website",
      },

      {
        property: "og:url",
        content: SITE_URL,
      },

      {
        property: "og:site_name",
        content: "Jhenifer Nogueira",
      },

      {
        property: "og:locale",
        content: "pt_BR",
      },

      // Twitter / X
      {
        name: "twitter:card",
        content: "summary",
      },

      {
        name: "twitter:title",
        content: "Jhenifer Nogueira | UGC Creator",
      },

      {
        name: "twitter:description",
        content:
          "Conteúdos UGC autênticos e estratégicos criados para aproximar marcas e pessoas.",
      },

      // Indexação
      {
        name: "robots",
        content: "index, follow",
      },
    ],

    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },

      {
        rel: "canonical",
        href: SITE_URL,
      },

      {
        rel: "icon",
        href: "/favicon.ico",
        type: "image/x-icon",
      },

      // Google Fonts
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },

      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },

      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap",
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",

    name: "Jhenifer Nogueira",

    url: SITE_URL,

    jobTitle: "UGC Creator",

    description:
      "Conteúdos autênticos e estratégicos que conectam marcas e pessoas. Portfólio UGC de Jhenifer Nogueira.",
  };

  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>

      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
