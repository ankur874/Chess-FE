import { StackNavigationProp } from "@react-navigation/stack";


export type HomeScreenNavigationProp = StackNavigationProp<any, "Home">;

export interface LandingPageProps {
    navigation: HomeScreenNavigationProp;
}
