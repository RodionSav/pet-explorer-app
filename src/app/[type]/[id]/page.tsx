"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BreedImage } from "@/types/petsTypes";
import { getCatImages, getDogImages } from "@/api/pets";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Spinner } from "@chakra-ui/react";

const BreedDetails = ({ params }: { params: { id: string; type: string } }) => {
  const { id, type } = params;
  const [breedWithImages, setBreedWithImages] = useState<BreedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let response: any;
        if (type === "cat") {
          response = await getCatImages(id);
        } else {
          response = await getDogImages(id);
        }
        setBreedWithImages(response);
        setSelectedImage(response[0]?.url || null);
        setCurrentImageIndex(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [type, id]);

  const breed = breedWithImages[0]?.breeds[0];

  const breedName = breed ? breed.name : "No name";
  const breedDescription = breed
    ? breed.description || "No description available."
    : "No description available.";
  const breedWeight = breed ? breed.weight?.metric || "N/A" : "N/A";
  const breedTemperament = breed ? breed.temperament || "N/A" : "N/A";
  const breedLifeSpan = breed ? breed.life_span || "N/A" : "N/A";

  const handleImageClick = (url: string, index: number) => {
    const isMobileOrTablet = window.innerWidth < 1024;

    setSelectedImage(url);
    setCurrentImageIndex(index);

    if (!isMobileOrTablet) {
      setIsModalOpen(true);
    }
  };

  const handleNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % breedWithImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(breedWithImages[nextIndex].url);
  };

  const handlePreviousImage = () => {
    const prevIndex =
      (currentImageIndex - 1 + breedWithImages.length) % breedWithImages.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(breedWithImages[prevIndex].url);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner margin="auto" width="70px" height="70px" marginTop={300} />
      </div>
    );
  }

  return (
    <div className="m-auto max-w-[1400px] p-5 bg-gradient-to-b">
      <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 mb-8">
        {breedName}
      </h1>
      <div className="flex flex-col justify-between lg:flex-row">
        <div className="mb-6 lg:mb-0">
          {selectedImage && (
            <Image
              src={selectedImage}
              alt={breedName}
              width={500}
              height={400}
              className="w-full h-100 sm:w-full lg:w-[600px] lg:h-[500px] object-cover lg:object-top rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => handleImageClick(selectedImage, currentImageIndex)}
            />
          )}
        </div>
        <div className="lg:w-1/2 lg:ml-10">
          <div className="space-y-6 p-4 bg-white rounded-lg shadow-md">
            <p className="text-lg mb-4 text-indigo-600 font-semibold text-shadow-md">
              {breedDescription}
            </p>
            <div>
              <p className="font-bold text-indigo-700">Weight:</p>
              <p className="text-gray-700">{breedWeight} kg</p>
            </div>
            <div>
              <p className="font-bold text-indigo-700">Temperament:</p>
              <div className="flex flex-wrap gap-2">
                {breedTemperament.split(",").map((temp, index) => (
                  <span
                    key={index}
                    className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full border border-blue-300"
                  >
                    {temp.trim()}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="font-bold text-indigo-700">Life Span:</p>
              <p className="text-gray-700">{breedLifeSpan} years</p>
            </div>
            <button
              onClick={() => router.back()}
              className="mt-5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-2 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
              Back
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex overflow-x-auto space-x-4 justify-start h-32 sm:h-36">
        {breedWithImages.map((image, index) => (
          <div key={index} className="w-32 h-32 sm:w-36 sm:h-36">
            <Image
              src={image.url}
              alt={`Thumbnail ${index}`}
              width={128}
              height={128}
              className="w-full h-full object-cover rounded-lg cursor-pointer border-2 border-gray-300 hover:border-indigo-500"
              onClick={() => handleImageClick(image.url, index)}
            />
          </div>
        ))}
      </div>

      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative max-w-3xl mx-auto bg-white rounded-lg shadow-xl">
            <Image
              src={selectedImage}
              alt="Enlarged breed"
              width={800}
              height={600}
              className="w-full h-[700px] object-contain rounded-lg"
            />
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-600 rounded-full p-2 shadow-lg transition-transform transform hover:scale-105"
            >
              Close
            </button>
            <button
              onClick={handlePreviousImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-blue-500 hover:bg-blue-600 rounded-full p-2 shadow-lg transition-transform hover:scale-105"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-blue-500 hover:bg-blue-600 rounded-full p-2 shadow-lg transition-transform hover:scale-105"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BreedDetails;
