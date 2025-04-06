import type { Metadata } from "next";
import Link from "next/link";
import './reset.scss'
import './layout.scss'
import './settings.scss'

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <head>
                <title>Coding ressources</title>
            </head>
            <body>
                <header className="application-header">
                    <h1>Coding ressources</h1>
                    <nav className="navbar">
                        <ul className="menu">
                            <li><Link href="/">Accueil</Link></li>
                            <li><Link href="/about">À propos</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                            <li><Link href="/users">Users</Link></li>
                            <li><Link href="/blog">Blog</Link></li>
                        </ul>
                    </nav>
                    <div></div>
                </header>
                <main className="main-content">
                    {children}
                </main>
            </body>
        </html>
    );
}
