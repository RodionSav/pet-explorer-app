import { Breed, BreedImage } from "@/types/petsTypes";
import { CAT_API_BASE_URL, CATKEY, DOG_API_BASE_URL, DOGKEY } from "@/utils/constants";
import { client } from "@/utils/fetchClient";

export const getCatBreeds = () => {
  return client.get<Breed[]>(
    CAT_API_BASE_URL,
    `/breeds?limit=30&&api_key=${CATKEY}`
  );
};

export const getCatImages = (breedId: string) => {
  return client.get(CAT_API_BASE_URL,
    `/images/search?limit=10&breed_ids=${breedId}&api_key=${CATKEY}`
  )
}

export const getDogBreeds = () => {
  return client.get<Breed[]>(
    DOG_API_BASE_URL,
    `/breeds?limit=34&page=0&api_key=${DOGKEY}`
  );
};

export const getSelectedDog = (breedId: string) => {
  return client.get<BreedImage>(
    DOG_API_BASE_URL,
    `/breeds/${breedId}?api_key=${DOGKEY}`
  );
};

export const getDogImages = (breedId: string) => {
  return client.get(DOG_API_BASE_URL,
    `/images/search?breed_ids=${breedId}&include_breeds=true&limit=10&api_key=${DOGKEY}`
  )
}
