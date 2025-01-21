import { Text, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import { getGameOverStyles } from "./gameOverStyles";
import { StackActions } from "@react-navigation/native";
import { BlurView } from "expo-blur";

export const GameOver = (props: any) => {
  const { navigation } = props;
  const { isWinner, message } = props.route.params;
  const styles = getGameOverStyles();
  const navigateToTop = () => {
    navigation.dispatch(StackActions.popToTop());
  };

  return (
    <BlurView tint="extraLight" intensity={15} style={styles.container}>
      <View style={styles.modal}>
        <Text style={styles.mainText} numberOfLines={2}>
          {message == undefined
            ? isWinner
              ? "Victory! Well Played!🎉"
              : "Well played! Try again!😇"
            : message}
        </Text>
        <Pressable onPress={navigateToTop} style={styles.homeBtn}>
          <Text style={styles.homeText}>Home</Text>
        </Pressable>
      </View>
    </BlurView>
  );
};
