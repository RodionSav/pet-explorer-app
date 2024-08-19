import { NormalizedBreedData } from "@/types/petsTypes";



export const normalizeData = (data: any[]): NormalizedBreedData => {
  const breed = data[0]?.breeds[0];

  return {
    breedName: breed?.name || "No name",
    breedDescription: breed?.description || "No description available.",
    breedWeight: breed?.weight?.metric || "N/A",
    breedTemperament: breed?.temperament || "N/A",
    breedLifeSpan: breed?.life_span || "N/A",
    images: data.length ? data : [],
  };
};

export const extractAnimalType = (url: string): string | null => {
  const regex = /(dog|cat)/;
  const match = url.match(regex);
  return match ? match[0] : null;
};

export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  defaultImage: string
) => {
  e.currentTarget.src = defaultImage;
};