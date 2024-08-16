import Image from "next/image";
import Link from "next/link";
import { Breed } from "@/types/petsTypes";
import { extractAnimalType } from "@/utils/utils";

interface BreedCardProps {
  breed: Breed;
}

const BreedCard: React.FC<BreedCardProps> = ({ breed }) => {
  const type = extractAnimalType(breed.image.url);

  return (
    <Link href={`/${type}/${breed.id}`} passHref>
      <div className="border border-blue-200 rounded-lg overflow-hidden p-4 w-[220px] h-[270px] md:h-[340px] sm:w-[200px] md:w-[230px] hover:shadow-xl hover:cursor-pointer hover:scale-105 hover:bg-gradient-to-br from-blue-300 to-blue-100 transition-transform bg-white/80 backdrop-blur-md">
        <Image
          src={breed.image.url}
          alt={breed.name}
          width={192}
          height={200}
          className="mx-auto rounded-md object-cover w-[192px] h-[140px] md:h-[200px]"
        />
        <p className="text-lg md:text-xl font-bold text-blue-800 mt-2">
          {breed.name}
        </p>
        <p className="text-blue-500">{breed.origin}</p>
      </div>
    </Link>
  );
};

export default BreedCard;
