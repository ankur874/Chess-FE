import { StyleSheet } from "react-native";


export const getLandingPageStyles = () => {
    return StyleSheet.create({
        landingPage: {
            flex: 1,
            padding: 16,
            alignItems: "center",
            justifyContent: "space-around",
            backgroundColor: "white",
        },
        image: {
            height: 300,
            width: 300,
        },
        playChessButton: {
            textAlign: "center",
            backgroundColor: "#749654",
            alignContent: "center",
        },
        buttonText: {
            marginHorizontal: 16,
            marginVertical: 12,
            color: "#eceed4",
        },
    });
}