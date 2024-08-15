import { useState, useEffect } from "react";
import BreedCard from "../BreedCard/BreedCard";
import { getCatBreeds, getDogBreeds } from "@/api/pets";
import { Breed } from "@/types/petsTypes";
import { Spinner } from "@chakra-ui/react";

interface BreedListProps {
  itemsPerPage?: number;
}

const BreedList: React.FC<BreedListProps> = ({ itemsPerPage = 6 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [breeds, setBreeds] = useState<Breed[]>([]);

  const totalPages = Math.ceil(breeds.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginationPets = breeds.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchBreeds = async () => {
      setLoading(true);
      try {
        const [catBreeds, dogBreeds]: [Breed[], Breed[]] = await Promise.all([
          getCatBreeds(),
          getDogBreeds(),
        ]);

        const combinedBreeds = [...catBreeds, ...dogBreeds];
        const shuffledBreeds = combinedBreeds.sort(() => Math.random() - 0.5);

        setBreeds(shuffledBreeds);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationButtons = () => {
    const minPage = Math.max(1, currentPage - 1);
    const maxPage = Math.min(totalPages, currentPage + 1);
    return Array.from({ length: maxPage - minPage + 1 }, (_, i) => minPage + i);
  };

  return (
    <div className="mb-8">
      <div className="flex flex-wrap mx-auto justify-center gap-2 p-0 mt-2 h-[760px] w-[280px] sm:w-[470px] sm:h-[760px] md:h-[1060px] lg:w-[710px] lg:h-[700px]">
        {loading && (
          <div className="col-span-full flex justify-center items-center m-auto h-96">
            <Spinner
              margin="auto"
              color="blue.300"
              width="70px"
              height="70px"
            />
          </div>
        )}
        {!loading &&
          breeds.length > 0 &&
          paginationPets.map((breed) => (
            <BreedCard key={breed.id} breed={breed} />
          ))}
        {!loading && !breeds.length && (
          <p className="col-span-full text-blue-300 text-center">
            No breeds found.
          </p>
        )}
      </div>

      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-[40px] h-[40px] bg-blue-700 text-white rounded-lg hover:shadow-[0px_0px_10px_white] transition duration-200 ease-in-out disabled:bg-gray-400"
        >
          Prev
        </button>
        <button
          disabled={true}
          className="hidden sm:block w-[40px] h-[40px] bg-blue-700 text-white rounded-lg cursor-default"
        >
          ...
        </button>
        {getPaginationButtons().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-[40px] h-[40px] text-white rounded-lg transition duration-200 ease-in-out ${
              currentPage === page
                ? "bg-blue-900 text-blue-700"
                : " bg-blue-700 hover:shadow-[0px_0px_10px_white]"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          disabled={true}
          className="hidden sm:block w-[40px] h-[40px] bg-blue-700 text-white rounded-lg cursor-default"
        >
          ...
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-[40px] h-[40px] bg-blue-700 text-white rounded-lg hover:shadow-[0px_0px_10px_white] transition duration-200 ease-in-out disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BreedList;
