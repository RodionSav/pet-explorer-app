import BreedList from '../BreedList/BreedList';

const AppContent = () => {
  return (
    <>
      <h1 className="h-[80px] sm:h-[65px] text-4xl md:text-6xl text-start bg-clip-text font-extrabold leading-tight mt-5 ml-10 mb-5 underline decoration-teal-400 animate-pulse text-transparent bg-gradient-to-r from-teal-400 via-blue-200 to-purple-300 ">
        Cats And Dogs Breeds
      </h1>
      <BreedList />
    </>
  );
};

export default AppContent;
