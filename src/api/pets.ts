import { Breed, BreedImage } from "@/types/petsTypes";
import { client } from "@/utils/fetchClient";

const CAT_API_BASE_URL = "https://api.thecatapi.com/v1";
const DOG_API_BASE_URL = "https://api.thedogapi.com/v1";

const CATKEY =
  "live_QX3VdcrYXDSTWikM7fOF2DH0VUw5Rs6hQsXhHvyPu4NnP6ALjWZWLCBa9SIgZF6M";

const DOGKEY =
  "live_Zhh6E3bAUyRt0gN1tFeoCLxlzBQMCYhF5QvLpUwxsTAj4VLoKQfErICqvX1AhzwI";

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
    `/breeds?limit=30&page=0&api_key=${DOGKEY}`
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
