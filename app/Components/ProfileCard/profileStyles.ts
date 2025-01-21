import { SECONDARY_COLOR } from "@/app/constants/AppConstants";
import { StyleSheet } from "react-native";
import { ProfileProps } from "./profileInterfaces";

export const getProfileStyles = (props: ProfileProps) => {
  return StyleSheet.create({
    profileContiner: {
      width: "100%",
      flexDirection: props.isOpponentProfile ? "row-reverse" : "row",
      marginVertical: 20,
    },
    avatar: {
      height: 60,
      width: 60,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: "black",
      backgroundColor: props.isActivePlayer ? "black" : "white",
      borderRadius: 20,
      marginHorizontal: 8,
    },
    initials: {
      fontSize: 34,
      color: props.isActivePlayer ? "white" : "black",
      fontFamily: "pixelated",
    },
    details: {
      justifyContent: "space-around",
      alignItems: props.isOpponentProfile ? "flex-end" : "flex-start",
    },
  });
};
