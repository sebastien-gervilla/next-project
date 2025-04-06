import { CodingRessource } from "@/interfaces";

export default async function CodingRessources() {
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
        <div id="coding-ressources-page" className="page">
            {renderCodingRessources()}
        </div>
    );
}