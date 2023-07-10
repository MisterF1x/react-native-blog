import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

export const UserInfo = () => {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <View style={styles.userContainer}>
      <View style={styles.userPicture}>
        {userInfo.picture ? (
          <ImageBackground
            source={{
              uri: userInfo.picture,
            }}
            style={styles.ImageBackground}
          />
        ) : null}
      </View>
      <View style={styles.userInfoContainer}>
        <Text style={styles.userName}>{userInfo.name}</Text>
        <Text style={styles.userEmail}>{userInfo.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: "row",
    marginTop: 32,
    marginBottom: 32,
  },
  userPicture: {
    height: 60,
    width: 60,
    borderRadius: 16,
    backgroundColor: "#E8E8E8",
    overflow: "hidden",
    marginRight: 8,
  },
  userInfoContainer: {
    justifyContent: "center",
  },
  userName: {
    color: "#212121",
    fontSize: 13,
    fontWeight: 700,
  },
  userEmail: {
    color: "rgba(33, 33, 33, 0.8)",
    fontSize: 11,
  },
  ImageBackground: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    alignItems: "center",
  },
});
