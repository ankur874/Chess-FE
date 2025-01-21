import { DARK_COLOR, PRIMARY_COLOR } from "@/app/constants/AppConstants";
import { StyleSheet } from "react-native";

export const getGameOverStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1, // Full-screen container
      justifyContent: "center", // Centers vertically
      alignItems: "center", // Centers horizontally
    },
    modal: {
      height: 200,
      width: 300,
      backgroundColor: "white",
      borderRadius: 16,
      justifyContent: "space-around",
      alignItems: "center",
      padding: 16,
      shadowColor: "#000",
      shadowOffset: { width: 2, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    mainText: {
      fontSize: 34,
      textAlign: "center",
      fontFamily: "pixelated_semibold",
    },
    homeBtn: {
      width: "50%",
      backgroundColor: DARK_COLOR,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 10,
      height: 50,
      borderColor: PRIMARY_COLOR,
      transform: [{ skewX: "-5deg" }],
    },
    homeText: { color: "white", fontFamily: "pixelated", fontSize: 18 },
  });
};
