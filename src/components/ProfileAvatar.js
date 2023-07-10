import {
  Alert,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { setUserImg } from "../redux/authSlice";
import { uploadImage } from "../helpers/uploadFile";
import { deleteFileFromStorage } from "../helpers/deleteFileFromStorage";
import { auth } from "../firebase/config";
import { updateProfile } from "firebase/auth";

export const ProfileAvatar = () => {
  const { picture } = useSelector(({ user }) => user.userInfo);
  const { userId } = useSelector(({ user }) => user.userInfo);
  const dispatch = useDispatch();
  const [statusMedia, requestPermissionMedia] =
    ImagePicker.useMediaLibraryPermissions();

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
    if (!hasPermission) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const url = await uploadImage(
        result.assets[0].uri,
        Date.now(),
        "usersAvatar"
      );
      dispatch(setUserImg(url));
      if (!!userId) {
        await updateProfile(auth.currentUser, { photoURL: url });
      }
    }
  };

  const deleteUserPicture = async () => {
    if (picture) {
      await deleteFileFromStorage(picture);
      dispatch(setUserImg(null));
    }
  };

  return (
    <>
      <View style={styles.userImgContainer}>
        <View style={styles.picture}>
          {picture && (
            <ImageBackground
              source={{
                uri: picture,
              }}
              style={styles.userImgBackground}
            />
          )}
        </View>
        {picture ? (
          <Pressable
            onPress={deleteUserPicture}
            style={[
              styles.iconBtn,
              picture && { backgroundColor: "#fff", borderRadius: 12 },
            ]}
          >
            <Icon name={"closecircleo"} size={25} color={"#BDBDBD"} />
          </Pressable>
        ) : (
          <Pressable
            onPress={pickImage}
            style={[
              styles.iconBtn,
              picture && { backgroundColor: "#fff", borderRadius: 12 },
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
