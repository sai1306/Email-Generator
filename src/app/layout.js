import './globals.css';
export default function RootLayout({ children }) {
    return (
        <html>
          <head>
          <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
          </head>
            <body>
                {children}
            </body>
        </html>
    );
}