import { useState, useRef, useEffect } from 'react';

export function useOutsideClick<T extends HTMLElement>() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current && 
        !ref.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return {
    ref,
    isOpen,
    setIsOpen
  };
}