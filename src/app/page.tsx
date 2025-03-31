import Image from "next/image";
import { CodingRessource } from "@/interfaces";
import './page.scss';

export default async function Home() {

    const response = await fetch('https://api.sampleapis.com/codingresources/codingResources');

    if (response.status !== 200) return (
        <div>
            <p>
                An error occured
            </p>
        </div>
    );

    const codingRessources: CodingRessource[] = await response.json();

    const renderCodingRessources = () => {
        return codingRessources.map(ressource => (
            <div
                key={ressource.id}
                className="ressource"
            >
                <p>{ressource.description}</p>
            </div>
        ));
    }

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
            {renderCodingRessources()}
        </div>
    );
}
