import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import { useMusic } from "../Context/musicContext";

let playBoardSoundRef: () => Promise<void> = async () => {};

let stopSoundRef: () => void = () => {};

export const AudioManager = () => {
  const [sound, setSound] = useState<Sound | null>(null);
  const { appSound, boardSound } = useMusic();

  const playBoardSound = async () => {
    try {
      if (!boardSound) return;
      if (sound) {
        sound.unloadAsync();
        setSound(null);
      }
      const { sound: soundCurr } = await Audio.Sound.createAsync(
        require("../../assets/audio/move-self.mp3")
      );
      setSound(soundCurr);
      await soundCurr.playAsync();
    } catch (error) {
      throw new Error("Error playing sound:");
    }
  };

  const playSound = async () => {
    try {
      if (sound) {
        return;
      }
      const { sound: soundCurr } = await Audio.Sound.createAsync(
        require("../../assets/audio/main-music.mp3")
      );
      setSound(soundCurr);
      await soundCurr.playAsync();
    } catch (error) {
      throw new Error("Error playing sound");
    }
  };

  const stopSound = () => {
    if (sound) {
      sound.unloadAsync();
      setSound(null);
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          stopSound();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    if (appSound != null) {
      appSound ? playSound() : stopSound();
    }
  }, [appSound]);

  playBoardSoundRef = playBoardSound;
  stopSoundRef = stopSound;
};

export const PlayBoardSound = () => {
  playBoardSoundRef();
};

export const stopSound = () => {
  stopSoundRef();
};
