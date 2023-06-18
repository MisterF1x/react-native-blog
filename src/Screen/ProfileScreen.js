import {
  Alert,
  ImageBackground,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import IconIonic from "react-native-vector-icons/Ionicons";
import BgImage from "../img/bg.png";
import { data } from "../data";
import { useNavigation } from "@react-navigation/native";
import { Post } from "../components/Post";
import { ProfileAvatar } from "../components/ProfileAvatar";
import { user } from "../userInfo";
import { useCallback, useState } from "react";
import { Skeleton } from "../components/Skeleton";

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert("Page is refreshed!!!");
    }, 2000);
  }, []);
  const handleLogout = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={BgImage} resizeMode="cover" style={styles.image}>
        <View style={styles.box}>
          <ProfileAvatar />
          <Pressable style={styles.btnLogout} onPress={handleLogout}>
            <IconIonic name="exit-outline" size={25} color="#BDBDBD" />
          </Pressable>
          <Text style={styles.text}>{user.name}</Text>
          {refreshing ? (
            <View style={{ flex: 1, backgroundColor: "white" }}>
              <View style={{ marginBottom: 30 }}>
                <Skeleton style={{ height: 240 }} />
                <Skeleton
                  style={{ width: 150, height: 12, marginVertical: 8 }}
                />
                <Skeleton style={{ height: 20 }} />
              </View>
              <View>
                <Skeleton style={{ height: 240 }} />
                <Skeleton
                  style={{ width: 150, height: 12, marginVertical: 8 }}
                />
                <Skeleton style={{ height: 20 }} />
              </View>
            </View>
          ) : (
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              {data.map((post, inx) => {
                return <Post key={inx + "-F"} post={post} type="Profile" />;
              })}
            </ScrollView>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 0.85,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  text: {
    marginBottom: 32,
    marginTop: 32,
    fontSize: 30,
    lineHeight: 35,
    fontWeight: 500,
    textAlign: "center",
  },
  // userImgContainer: {
  //   backgroundColor: "#F6F6F6",
  //   borderRadius: 16,
  //   height: 120,
  //   width: 120,
  //   alignSelf: "center",
  //   marginTop: -60,
  // },
  // picture: {
  //   flex: 1,
  //   borderRadius: 16,
  //   overflow: "hidden",
  // },
  // iconBtn: {
  //   position: "absolute",
  //   bottom: 14,
  //   right: -12,
  // },
  // userImgBackground: {
  //   flex: 1,
  //   resizeMode: "cover",
  //   width: "100%",
  //   alignItems: "center",
  // },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },

  btnLogout: {
    position: "absolute",
    top: 16,
    right: 16,
  },
});
