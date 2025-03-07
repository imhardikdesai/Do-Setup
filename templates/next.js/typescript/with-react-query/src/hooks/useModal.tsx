import { useState } from "react";

interface UseModalReturnType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
}

const useModal = (initialState: boolean): UseModalReturnType => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const toggleModal = () => setIsOpen((prevState) => !prevState);

  return { isOpen, openModal, closeModal, toggleModal };
};

export default useModal;
