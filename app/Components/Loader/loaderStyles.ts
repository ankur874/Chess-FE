import { DARK_COLOR } from "@/app/constants/AppConstants";
import { StyleSheet } from "react-native";

export const getLoaderStyles = () => {
  return StyleSheet.create({
    modalBackground: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "red",
    },
    loaderContainer: {
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    message: {
      marginTop: 10,
      textAlign: "center",
      color: DARK_COLOR,
      fontSize: 28,
      fontFamily: "pixelated_semibold",
    },
  });
};
