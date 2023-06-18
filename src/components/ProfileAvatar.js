import { useState } from "react";
import {
  Alert,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";

export const ProfileAvatar = () => {
  const [statusMedia, requestPermissionMedia] =
    ImagePicker.useMediaLibraryPermissions();
  const [userImg, setUserImg] = useState("");

  // console.log(onPress);
  // const onPressHandler = () => {
  //   openBottomSheet();
  // };
  const verifyPermission = async () => {
    if (
      statusMedia.status === "undetermined" ||
      statusMedia.status !== "granted"
    ) {
      const permissionResponse = await requestPermissionMedia();

      return permissionResponse.granted;
    }
    if (statusMedia.status === "denied") {
      Alert.alert(
        "Insufficient permission!",
        "You need to grant camera access to use this app"
      );
      return false;
    }
    return true;
  };
  const pickImage = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUserImg(result.assets[0].uri);
    }
  };
  return (
    <>
      <View style={styles.userImgContainer}>
        <View style={styles.picture}>
          {userImg && (
            <ImageBackground
              source={{
                uri: userImg,
              }}
              style={styles.userImgBackground}
            />
          )}
        </View>
        {userImg ? (
          <Pressable
            onPress={() => setUserImg("")}
            style={[
              styles.iconBtn,
              userImg && { backgroundColor: "#fff", borderRadius: 12 },
            ]}
          >
            <Icon name={"closecircleo"} size={25} color={"#BDBDBD"} />
          </Pressable>
        ) : (
          <Pressable
            onPress={pickImage}
            style={[
              styles.iconBtn,
              userImg && { backgroundColor: "#fff", borderRadius: 12 },
            ]}
          >
            <Icon name={"pluscircleo"} size={25} color={"#FF6C00"} />
          </Pressable>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  userImgContainer: {
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    height: 120,
    width: 120,
    alignSelf: "center",
    marginTop: -60,
  },
  picture: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
  },
  userImgBackground: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    alignItems: "center",
  },
  iconBtn: {
    position: "absolute",
    bottom: 14,
    right: -12,
  },
});
