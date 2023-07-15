import NavBar from "./components/NavBar";
import './globals.css';

export default function RootLayout({ children,}: { children: React.ReactNode; }) {
    return (
        <html lang="en">
        <head/>
        <body>
        <main className="bg-gray-100 min-h-screen w-screen">
            <main className="max-w-screen-2xl m-auto bg-white">
                <NavBar/>
                {children}
            </main>
        </main>
        </body>
        </html>
    );
}