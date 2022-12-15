const useLocalSotrage = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default useLocalSotrage;
