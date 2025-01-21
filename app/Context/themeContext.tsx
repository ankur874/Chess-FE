import { useFonts } from "expo-font";
import React, { createContext, useContext } from "react";

export const ThemeContext = createContext({
  loaded: false,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [loaded, error] = useFonts({
    pixelated: require("../../assets/fonts/PixelifySans-Regular.ttf"),
    pixelated_black: require("../../assets/fonts/PixelifySans-Black.ttf"),
    pixelated_semibold: require("../../assets/fonts/PixelifySans-SemiBold.ttf"),
  });

  if (!loaded && !error) {
    return null;
  }
  return (
    <ThemeContext.Provider
      value={{
        loaded,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context != null) {
    return context;
  }
};
