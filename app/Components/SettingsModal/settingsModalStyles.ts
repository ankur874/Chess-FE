import { Dimensions, StyleSheet } from "react-native";

export const getSettingsModalStyles = () => {
  return StyleSheet.create({
    modalContainer: { height: Dimensions.get("screen").height },
    overlay: { backgroundColor: "transparent", flex: 1 },
    bottomsheet: {
      height: 250,
      backgroundColor: "black",
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: 16,
    },
    actionitem: {
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      margin: 8,
    },
    handler: {
      width: 70,
      height: 10,
      backgroundColor: "white",
      borderRadius: 10,
    },
    text: {
      fontSize: 18,
      fontFamily: "pixelated",
      color: "white",
    },
  });
};
