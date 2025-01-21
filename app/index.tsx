import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { LandingPage } from "./Screens/LandingPage/LandingPage";
import { GamePlay } from "./Screens/GamePlay/GamePlay";
import { Header } from "./Components/Header/header";
import { SettingsModal } from "./Components/SettingsModal/settingsModal";
import { MusicProvider } from "./Context/musicContext";
import { GameOver } from "./Components/GameOver/gameOver";
import { TimeProvider } from "./Context/timeContext";
import { useFonts } from "expo-font";

const Stack = createStackNavigator();

export default function HomeScreen() {
  const [loaded, error] = useFonts({
    pixelated: require("../assets/fonts/PixelifySans-Regular.ttf"),
    pixelated_black: require("../assets/fonts/PixelifySans-Black.ttf"),
    pixelated_semibold: require("../assets/fonts/PixelifySans-SemiBold.ttf"),
  });

  if (!loaded && !error) {
    return null;
  }
  return (
    <MusicProvider>
      <TimeProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Landing"
            screenOptions={{
              header: (props) => <Header {...props} />,
            }}
          >
            <Stack.Screen name="Landing" component={LandingPage} />
            <Stack.Screen name="Game" component={GamePlay} />
            <Stack.Screen
              name="Settings"
              component={SettingsModal}
              options={{
                gestureResponseDistance: 1000,
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                presentation: "transparentModal",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="GameOver"
              component={GameOver}
              options={{
                gestureEnabled: false,
                cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
                presentation: "transparentModal",
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TimeProvider>
    </MusicProvider>
  );
}
