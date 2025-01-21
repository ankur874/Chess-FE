import { DARK_COLOR } from "@/app/constants/AppConstants";
import { StyleSheet } from "react-native";

export const getHeaderStyles = () => {
  return StyleSheet.create({
    headerContainer: {
      height: 50,
      backgroundColor: "white",
      paddingHorizontal: 16,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: DARK_COLOR,
    },
    navContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    headerTitle: {
      fontFamily: "pixelated",
    },
  });
};
