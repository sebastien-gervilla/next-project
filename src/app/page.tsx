import Image from "next/image";
import './page.scss';

export default async function Home() {
    return (
        <div id="home-page" className="page">
            <Image
                src="/image.jpg"
                alt="Image d'accueil"
                width={800}
                height={600}
                priority
                style={{ borderRadius: 8 }}
            />
        </div>
    );
}
