import { useState } from "react";

interface UseLoadingReturnType {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  toggleLoading: () => void;
}

const useLoading = (initialState: boolean = false): UseLoadingReturnType => {
  const [isLoading, setIsLoading] = useState<boolean>(initialState);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);
  const toggleLoading = () => setIsLoading((prevState) => !prevState);

  return { isLoading, startLoading, stopLoading, toggleLoading };
};

export default useLoading;
