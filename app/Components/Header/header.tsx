import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { HeaderProps } from "./headerInterfaces";
import { useEffect, useState } from "react";
import { getHeaderStyles } from "./headerStyles";

export const Header = (props: HeaderProps) => {
  const { navigation, back } = props;
  const [nav, setNav] = useState(navigation);
  const title = back?.title;
  const styles = getHeaderStyles();

  const onBackPress = () => {
    if (nav.canGoBack()) {
      nav.goBack();
    }
  };

  const onSettingsPressed = () => {
    nav.navigate("Settings");
  };

  useEffect(() => {
    setNav(navigation);
  }, [navigation]);

  return (
    <View style={styles.headerContainer}>
      {title ? (
        <View style={styles.navContainer}>
          <Ionicons name="arrow-back" size={26} onPress={onBackPress} />
          <Text style={styles.headerTitle}>{title ?? ""}</Text>
        </View>
      ) : (
        <Text style={styles.headerTitle}>My Chess</Text>
      )}
      <Ionicons name="settings-outline" size={26} onPress={onSettingsPressed} />
    </View>
  );
};
