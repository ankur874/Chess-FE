import { ActivityIndicator, Modal, Text, View } from "react-native";
import { LoaderProps } from "./loaderInterfaces";
import { getLoaderStyles } from "./loaderStyles";
import { SECONDARY_COLOR } from "@/app/constants/AppConstants";

export const Loader = (props: LoaderProps) => {
  const { loading, message } = props;
  const styles = getLoaderStyles();
  if (!loading) return null;

  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color={SECONDARY_COLOR} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};
