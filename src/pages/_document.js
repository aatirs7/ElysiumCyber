import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* Preconnect to Google Fonts for better performance */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

                {/* Load fonts with display=swap for better performance */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Slab:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />

                {/* Color scheme for proper dark mode support */}
                <meta name="color-scheme" content="light dark" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
