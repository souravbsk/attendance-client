import "./globals.css";
import ClientProvider from "@/Providers/ClientProvider";
export default function RootLayout({ children }) {
  return (
    <html data-theme="light" lang="en">
      <body>
        <ClientProvider>
          <main>{children}</main>
        </ClientProvider>
      </body>
    </html>
  );
}
