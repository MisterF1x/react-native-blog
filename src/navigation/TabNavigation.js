import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PostsScreen } from "../Screen/PostsScreen";
import { CreatePostsScreen } from "../Screen/CreatePostsScreen";
import { ProfileScreen } from "../Screen/ProfileScreen";
import { Pressable, View } from "react-native";
import IconIonic from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const Tabs = createBottomTabNavigator();

export const TabNavigation = () => {
  const navigation = useNavigation();
  const handleLogout = () => {
    navigation.navigate("Login");
  };
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: "center",
        headerStyle: {
          borderBottomWidth: 1,
          borderBottomColor: "#8C8C8C",
        },
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          if (route.name === "Posts") {
            iconName = "appstore-o";
          } else if (route.name === "CreatePost") {
            iconName = "plus";
          } else if (route.name === "Profile") {
            iconName = "user";
          }
          return (
            <View
              style={{
                height: 40,
                backgroundColor: focused ? "#FF6C00" : null,
                paddingVertical: 8,
                paddingHorizontal: 23,
                borderRadius: 20,
              }}
            >
              <Icon
                name={iconName}
                size={size}
                color={focused ? "#fff" : "#212121"}
              />
            </View>
          );
        },
        tabBarShowLabel: false,
        tabBarStyle: { height: 70 },
      })}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerRight: () => (
            <Pressable style={{ marginRight: 16 }} onPress={handleLogout}>
              <IconIonic name="exit-outline" size={25} color="#BDBDBD" />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="CreatePost"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          title: "Create post",
          tabBarStyle: { display: "none" },
          headerLeft: () => (
            <Pressable
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrowleft" size={25} color="#8C8C8C" />
            </Pressable>
          ),
        })}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tabs.Navigator>
  );
};
