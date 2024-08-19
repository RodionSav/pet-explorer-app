import { useState, useEffect } from "react";
import BreedCard from "../BreedCard/BreedCard";
import { getCatBreeds, getDogBreeds } from "@/api/pets";
import { Breed } from "@/types/petsTypes";
import { Spinner } from "@chakra-ui/react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface BreedListProps {
  itemsPerPage?: number;
}

const BreedList: React.FC<BreedListProps> = ({ itemsPerPage = 8 }) => {
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

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <div className="mb-8">
      <div className="flex flex-wrap mx-auto gap-2 p-0 mt-2 h-[2260px] w-[222px] sm:w-[410px] sm:h-[1120px] md:w-[470px] md:h-[1390px] lg:w-[945px] lg:h-[700px]">
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

      <Stack spacing={1} alignItems="center" className="mt-4">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          variant="outlined"
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "white",
              backgroundColor: "#1E90FF",
              width: "40px",
              height: "40px",
              minWidth: "28px",
              borderRadius: "4px",
              margin: "0 2px",
              "@media (max-width: 500px)": {
                width: "30px",
                height: "30px",
                fontSize: "12px",
              },
              "@media (max-width: 320px)": {
                width: "15px",
                height: "15px",
                fontSize: "10px",
              },
            },
            "& .Mui-selected": {
              backgroundColor: "#0B5394",
              color: "white",
              "&:hover": {
                backgroundColor: "#0B5394",
              },
            },
            "& .MuiPaginationItem-root:hover": {
              backgroundColor: "#1E90FF",
            },
            "& .MuiPaginationItem-ellipsis": {
              backgroundColor: "#1E90FF",
              color: "white",
              width: "40px",
              height: "40px",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "@media (max-width: 500px)": {
                width: "30px",
                height: "30px",
              },
              "@media (max-width: 320px)": {
                width: "15px",
                height: "15px",
              },
            },
          }}
        />
      </Stack>
    </div>
  );
};

export default BreedList;
