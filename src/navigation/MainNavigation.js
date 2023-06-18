import { RegistrationScreen } from "../Screen/RegistrationScreen";
import { LoginScreen } from "../Screen/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../Screen/Home";
import { MapScreen } from "../Screen/MapScreen";
import { CommentsScreen } from "../Screen/CommentsScreen";

export const MainNavigation = () => {
  const MainStack = createStackNavigator();

  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerTitleAlign: "center" }}
      >
        <MainStack.Screen name="Map" component={MapScreen} />
        <MainStack.Screen name="Comments" component={CommentsScreen} />
        <MainStack.Screen
          name="Signup"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
