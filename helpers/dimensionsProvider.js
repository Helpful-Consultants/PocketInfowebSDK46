import React, { createContext, useContext, useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

// Creating context to provide dimensions globally
const DimensionsContext = createContext();

// Custom hook to use dimensions throughout the app
export const useDimensions = () => {
  return useContext(DimensionsContext);
};

export const DimensionsProvider = ({ children }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('screen'));

  useEffect(() => {
    // Listen for screen orientation/size changes
    const onChange = ({ window }) => {
      setDimensions(window); // Update dimensions when orientation changes
    };

    // Adding event listener for screen size changes (rotation)
    const subscription = Dimensions.addEventListener('change', onChange);

    // Clean up event listener on component unmount
    return () => subscription.remove();
  }, []);

  return (
    <DimensionsContext.Provider value={dimensions}>
      {children}
    </DimensionsContext.Provider>
  );
};
