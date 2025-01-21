import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

export interface MusicState {
  appSound: boolean | null;
  boardSound: boolean | null;
  toggleAppSound: () => void;
  toggleBoardSound: () => void;
}

const MusicContext = createContext<MusicState | undefined>(undefined);

export const MusicProvider = ({ children }: { children: React.ReactNode }) => {
  const [appSound, setAppSound] = useState<boolean | null>(null);
  const [boardSound, setBoardSound] = useState<boolean | null>(null);

  const toggleAppSound = () => {
    setDataInAsync("AppSound", !appSound);
    setAppSound(!appSound);
  };

  const toggleBoardSound = () => {
    setDataInAsync("BoardSound", !boardSound);
    setBoardSound(!boardSound);
  };

  const getDataFromAsync = async () => {
    const appSound1 = await AsyncStorage.getItem("AppSound");
    const boardSound1 = await AsyncStorage.getItem("BoardSound");
    setAppSound(appSound1 == null || appSound1 === "true" ? true : false);
    setBoardSound(boardSound1 == null || boardSound1 === "true" ? true : false);
  };

  const setDataInAsync = async (key: string, value: boolean) => {
    await AsyncStorage.setItem(key, String(value));
  };

  useEffect(() => {
    getDataFromAsync();
  }, []);

  return (
    <MusicContext.Provider
      value={{
        appSound,
        boardSound,
        toggleAppSound,
        toggleBoardSound,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};
