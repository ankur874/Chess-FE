import { View, Text } from "react-native";
import { ProfileProps } from "./profileInterfaces";
import { SECONDARY_COLOR } from "@/app/constants/AppConstants";
import { getProfileStyles } from "./profileStyles";

export const ProfileCard = (props: ProfileProps) => {
  const { name, timerInSeconds } = props;
  const styles = getProfileStyles(props);

  const formatTime = (timerInSeconds: number) => {
    const minutes = Math.floor(timerInSeconds / 60); // Get whole minutes
    const seconds = timerInSeconds % 60; // Get remaining seconds
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`; // Format as MM:SS
  };

  return (
    <View style={styles.profileContiner}>
      <View style={styles.avatar}>
        <Text style={styles.initials}>{name[0]}</Text>
      </View>
      <View style={styles.details}>
        <Text style={{ fontFamily: "pixelated_semibold", fontSize: 20 }}>
          {name}
        </Text>
        <Text style={{ fontFamily: "pixelated", fontSize: 20 }}>
          {formatTime(timerInSeconds)}
        </Text>
      </View>
    </View>
  );
};
