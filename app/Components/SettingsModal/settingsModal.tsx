import { Switch, Text, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import { getSettingsModalStyles } from "./settingsModalStyles";
import { useMusic } from "@/app/Context/musicContext";

export const SettingsModal = (props: any) => {
  const { navigation } = props;
  const { appSound, boardSound, toggleAppSound, toggleBoardSound } = useMusic();

  const styles = getSettingsModalStyles();

  return (
    <View style={styles.modalContainer}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.overlay}
      />

      <View style={styles.bottomsheet}>
        <View style={styles.handler}></View>
        <View style={styles.actionitem}>
          <Text style={styles.text}>App Music</Text>
          <Switch
            ios_backgroundColor={"white"}
            onValueChange={toggleAppSound}
            thumbColor={"black"}
            value={appSound ?? true}
          />
        </View>
        <View style={styles.actionitem}>
          <Text style={styles.text}>Chess Board Sound</Text>
          <Switch
            ios_backgroundColor={"white"}
            onValueChange={toggleBoardSound}
            thumbColor={"black"}
            value={boardSound ?? true}
          />
        </View>
      </View>
    </View>
  );
};
