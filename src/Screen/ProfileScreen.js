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
import { useNavigation } from "@react-navigation/native";
import { Post } from "../components/Post";
import { ProfileAvatar } from "../components/ProfileAvatar";
import { useCallback, useState } from "react";
import { Skeleton } from "../components/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, initUserPosts } from "../redux/operations";
import { resetUserPosts } from "../redux/authSlice";

export const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { userPosts } = useSelector(({ user }) => user);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      dispatch(resetUserPosts());
      await initUserPosts(dispatch, userInfo.userId);
    } catch (error) {
      Alert.alert("Oops something went wrong!");
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handleLogout = async () => {
    await LogOut(dispatch);
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
          <Text style={styles.text}>{userInfo.name}</Text>
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
              {userPosts.length ? (
                userPosts.map((post) => {
                  return <Post key={post.postId} post={post} type="Profile" />;
                })
              ) : (
                <Text style={styles.notifyText}>
                  You haven't created any post yet.
                </Text>
              )}
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
  notifyText: {
    fontSize: 22,
    fontWeight: 700,
    textTransform: "uppercase",
    color: "#BDBDBD",
  },
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
