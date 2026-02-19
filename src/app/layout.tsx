import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";

import classNames from "classnames";

import {
  Column,
  Flex,
  Meta,
} from "@once-ui-system/core";
import { ClickSpark, Footer, Header, RouteGuard, Providers } from "@/components";
import { Squares } from "@/components/Squares";
import { baseURL, fonts, style, dataStyle, home } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex
      suppressHydrationWarning
      as="html"
      lang="en"
      fillWidth
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
    >
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const root = document.documentElement;
                  const defaultTheme = 'system';
                  
                  // Set defaults from config
                  const config = ${JSON.stringify({
              brand: style.brand,
              accent: style.accent,
              neutral: style.neutral,
              solid: style.solid,
              "solid-style": style.solidStyle,
              border: style.border,
              surface: style.surface,
              transition: style.transition,
              scaling: style.scaling,
              "viz-style": dataStyle.variant,
            })};
                  
                  // Apply default values
                  Object.entries(config).forEach(([key, value]) => {
                    root.setAttribute('data-' + key, value);
                  });
                  
                  // Resolve theme
                  const resolveTheme = (themeValue) => {
                    if (!themeValue || themeValue === 'system') {
                      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    }
                    return themeValue;
                  };
                  
                  // Apply saved theme
                  const savedTheme = localStorage.getItem('data-theme');
                  const resolvedTheme = resolveTheme(savedTheme);
                  root.setAttribute('data-theme', resolvedTheme);
                  
                  // Apply any saved style overrides
                  const styleKeys = Object.keys(config);
                  styleKeys.forEach(key => {
                    const value = localStorage.getItem('data-' + key);
                    if (value) {
                      root.setAttribute('data-' + key, value);
                    }
                  });
                } catch (e) {
                  console.error('Failed to initialize theme:', e);
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <Providers>
        <Column
          as="body"
          background="page"
          fillWidth
          style={{ minHeight: "100vh" }}
          margin="0"
          padding="0"
          horizontal="center"
        >
          <div
            style={{
              position: "fixed",
              inset: 0,
              width: "100%",
              height: "100%",
              zIndex: 0,
              pointerEvents: "none",
            }}
          >
            <Squares
              direction="up"
              speed={0.3}
              squareSize={100}
            />
          </div>
          {/* Edge vignette / fade overlay */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1,
              pointerEvents: "none",
              background: `
                linear-gradient(to bottom, var(--page-background) 0%, rgba(0,0,0,0) 18%),
                linear-gradient(to top,    var(--page-background) 0%, rgba(0,0,0,0) 18%),
                linear-gradient(to right,  var(--page-background) 0%, rgba(0,0,0,0) 12%),
                linear-gradient(to left,   var(--page-background) 0%, rgba(0,0,0,0) 12%)
              `,
            }}
          />
          <Flex fillWidth minHeight="16" s={{ hide: true }} />
          <Header />
          <Flex zIndex={2} fillWidth padding="l" horizontal="center" flex={1}>
            <Flex horizontal="center" fillWidth minHeight="0">
              <ClickSpark
                sparkColor="auto"
                sparkCount={10}
                sparkSize={12}
                sparkRadius={22}
                duration={450}
                style={{ width: "100%", height: "100%" }}
              >
                <RouteGuard>{children}</RouteGuard>
              </ClickSpark>
            </Flex>
          </Flex>
          <div style={{ position: "relative", zIndex: 2 }}>
            <Footer />
          </div>
        </Column>
      </Providers>
    </Flex>
  );
}
