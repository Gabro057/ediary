"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApolloServerPluginLandingPageProductionDefault = exports.ApolloServerPluginLandingPageLocalDefault = void 0;
function ApolloServerPluginLandingPageLocalDefault(options = {}) {
    const { version, __internal_apolloStudioEnv__, footer, document, variables, headers, includeCookies, ...rest } = options;
    return ApolloServerPluginLandingPageDefault(version, encodeConfig({
        isProd: false,
        apolloStudioEnv: __internal_apolloStudioEnv__,
        footer,
        document,
        variables,
        headers,
        includeCookies,
        ...rest,
    }));
}
exports.ApolloServerPluginLandingPageLocalDefault = ApolloServerPluginLandingPageLocalDefault;
function ApolloServerPluginLandingPageProductionDefault(options = {}) {
    const { version, __internal_apolloStudioEnv__, footer, document, variables, headers, includeCookies, graphRef, ...rest } = options;
    return ApolloServerPluginLandingPageDefault(version, encodeConfig({
        isProd: true,
        apolloStudioEnv: __internal_apolloStudioEnv__,
        footer,
        document,
        variables,
        headers,
        includeCookies,
        graphRef,
        ...rest,
    }));
}
exports.ApolloServerPluginLandingPageProductionDefault = ApolloServerPluginLandingPageProductionDefault;
function encodeConfig(config) {
    return JSON.stringify(encodeURIComponent(JSON.stringify(config)));
}
function ApolloServerPluginLandingPageDefault(maybeVersion, encodedConfig) {
    const version = maybeVersion !== null && maybeVersion !== void 0 ? maybeVersion : '_latest';
    return {
        __internal_installed_implicitly__: false,
        async serverWillStart() {
            return {
                async renderLandingPage() {
                    const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link
      rel="icon"
      href="https://apollo-server-landing-page.cdn.apollographql.com/${version}/assets/favicon.png"
    />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap"
      rel="stylesheet"
    />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Apollo server landing page" />
    <link
      rel="apple-touch-icon"
      href="https://apollo-server-landing-page.cdn.apollographql.com/${version}/assets/favicon.png"
    />
    <link
      rel="manifest"
      href="https://apollo-server-landing-page.cdn.apollographql.com/${version}/manifest.json"
    />
    <title>Apollo Server</title>
  </head>
  <body style="margin: 0; overflow-x: hidden; overflow-y: hidden">
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="react-root">
      <style>
        .fallback {
          opacity: 0;
          animation: fadeIn 1s 1s;
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
          padding: 1em;
        }
        @keyframes fadeIn {
          0% {opacity:0;}
          100% {opacity:1; }
        }
      </style>
      <div class="fallback">
        <h1>Welcome to Apollo Server</h1>
        <p>It appears that you might be offline. POST to this endpoint to query your graph:</p>
        <code style="white-space: pre;">
curl --request POST \\
  --header 'content-type: application/json' \\
  --url '<script>document.write(window.location.href)</script>' \\
  --data '{"query":"query { __typename }"}'</code>
      </div>
    </div>
    <script>window.landingPage = ${encodedConfig};</script>
    <script src="https://apollo-server-landing-page.cdn.apollographql.com/${version}/static/js/main.js"></script>
  </body>
</html>
          `;
                    return { html };
                },
            };
        },
    };
}
//# sourceMappingURL=index.js.map