import { useState, useEffect } from "react";

/**
 * Custom hook to manage state synchronized with localStorage
 *
 * @param {string} key - The key under which the value is stored in localStorage.
 * @param {any} initialValue - The default value to use if none is found in localStorage.
 * @returns {[any, function]} - Returns the current value and a setter function.
 */
const useLocalStorage = (key: string, initialValue: any) => {
  // Initialize state with a function to avoid recomputation on every render
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);

      return storedValue !== null ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key:", key, error);

      return initialValue;
    }
  });

  // Effect to update localStorage whenever the state changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting localStorage key:", key, error);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
