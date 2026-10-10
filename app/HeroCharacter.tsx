import Image from "next/image";

export default function HeroCharacter() {
  return <div className="agent-visual hero-character">
    <Image className="character-portrait" src="/generated/arun-character-cartoon.png" alt="Cartoon portrait of Arun wearing a straw hat and glasses" width={1024} height={1536} priority/>
  </div>;
}
