import { View, Text, StyleSheet, Button, Image, Pressable } from "react-native";
import { LANDING_PAGE_IMAGE } from "../../constants/AppConstants";
import { LandingPageProps } from "./LandingPageInterfaces";
import { getLandingPageStyles } from "./LandingPageStyles";

export const LandingPage = ({ navigation }: LandingPageProps) => {
  const styles = getLandingPageStyles();

  const GoToGame = () => {
    navigation.navigate("Game");
  };

  return (
    <View style={styles.landingPage}>
      <Image
        style={styles.image}
        source={{
          uri: LANDING_PAGE_IMAGE,
        }}
      />
      <Pressable onPress={GoToGame}>
        <View style={styles.playChessButton}>
          <Text style={styles.buttonText}>Play Chess</Text>
        </View>
      </Pressable>
    </View>
  );
};
