import { SECONDARY_COLOR } from "@/app/constants/AppConstants";
import { StyleSheet } from "react-native";

export const getGamePlayStyles = () => {
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      paddingHorizontal: 20,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
    },
    connectingText: {
      fontSize: 24,
      fontWeight: "bold",
      color: SECONDARY_COLOR,
    },
  });
};
