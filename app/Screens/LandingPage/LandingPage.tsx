import {
  Pressable,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SECONDARY_COLOR } from "../../constants/AppConstants";
import { LandingPageProps } from "./LandingPageInterfaces";
import { getLandingPageStyles } from "./LandingPageStyles";
import { useRef, useState } from "react";
import { AudioManager } from "@/app/AudioManager/AudioManager";
import { ScrollView } from "react-native-gesture-handler";

export const LandingPage = ({ navigation }: LandingPageProps) => {
  const [name, setName] = useState("");
  const styles = getLandingPageStyles();
  const audioManager = useRef(AudioManager());
  const GoToGame = () => {
    if (name.length < 3) return;
    navigation.navigate("Game", {
      name,
    });
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.landingPage}>
        <View style={styles.bottomBar}>
          <Text style={styles.title} numberOfLines={3}>
            Master the game of Chess
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={(e) => {
              setName(e);
            }}
          />
          <Pressable
            style={
              name.length > 3
                ? styles.playChessButton
                : [styles.playChessButton, { backgroundColor: SECONDARY_COLOR }]
            }
            onPress={GoToGame}
          >
            <Text style={styles.buttonText}>Start Game</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
