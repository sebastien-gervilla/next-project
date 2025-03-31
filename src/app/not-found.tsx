"use client";

import Lottie from "lottie-react";
import animationData from "../../public/404.json";
import Link from "next/link";

export default function NotFound() {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Erreur 404</h1>
            <p>La page que vous recherchez n'existe pas.</p>
            <Lottie animationData={animationData} loop={true} style={{ width: 300, margin: "auto" }} />
            <Link href="/" style={{ display: "block", marginTop: "20px", fontSize: "18px", color: "blue" }}>
                Retour à l'accueil
            </Link>
        </div>
    );
}