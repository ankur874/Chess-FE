import {
  DARK_COLOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
} from "@/app/constants/AppConstants";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

export const getLandingPageStyles = () => {
  const height = Dimensions.get("window").height;
  return StyleSheet.create({
    landingPage: {
      flex: 1,
      padding: 16,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
    },
    playChessButton: {
      textAlign: "center",
      backgroundColor: DARK_COLOR,
      alignContent: "center",
      justifyContent: "center",
      paddingHorizontal: 10,
      height: 50,
      borderColor: PRIMARY_COLOR,
      transform: [{ skewX: "-5deg" }],
    },
    buttonText: {
      color: PRIMARY_COLOR,
      alignSelf: "center",
      fontFamily: "pixelated",
      letterSpacing: 2,
      fontSize: 18,
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      height: Dimensions.get("window").height,
      width: Dimensions.get("window").width,
      opacity: 0.8,
    },
    bottomBar: {
      width: "80%",
    },
    title: {
      fontSize: 40,
      textAlign: "left",
      fontFamily: "pixelated_semibold",
      marginBottom: 20,
      color: DARK_COLOR,
      transform: [{ skewX: "-5deg" }],
    },
    input: {
      height: 50,
      borderColor: SECONDARY_COLOR,
      borderWidth: 1,
      fontFamily: "pixelated",
      paddingHorizontal: 10,
      marginBottom: 20,
      backgroundColor: PRIMARY_COLOR,
      transform: [{ skewX: "-5deg" }],
    },
  });
};
