import {
  Alert,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { CustomButton } from "../components/Button";
import { useEffect, useRef, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { useSelector } from "react-redux";
import { uploadImage } from "../helpers/uploadFile";
import { addPostToStorage } from "../redux/operations";
import { Loader } from "../components/Loader";

export const CreatePostsScreen = () => {
  const { userId } = useSelector(({ user }) => user.userInfo);

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [postImg, setPostImg] = useState(null);
  const [postTitle, setPostTitle] = useState(null);
  const [postRegion, setPostRegion] = useState(null);

  const cameraRef = useRef(null);
  const inputTitle = useRef();
  const inputLocation = useRef();

  useEffect(() => {
    (async () => {
      await MediaLibrary.requestPermissionsAsync();
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission for camera not granted. Please change this in settings."
        );
      }
      setHasCameraPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Insufficient permissions!",
          "Sorry, we need location permissions to make this work!",
          [{ text: "Okay" }]
        );
      }
    })();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const clearPostForm = () => {
    inputTitle.current.clear();
    inputLocation.current.clear();
    setPostImg(null);
    setPostTitle(null);
    setPostRegion(null);
  };

  const getLocation = async () => {
    try {
      const { coords } = await Location.getCurrentPositionAsync({});
      return {
        lat: coords.latitude,
        long: coords.longitude,
      };
    } catch (error) {
      console.warn(error);
    }
  };

  const onPressPublish = async () => {
    const date = new Date(Date.now());
    try {
      setIsLoading(true);
      const { lat, long } = await getLocation();
      const region = await Location.reverseGeocodeAsync({
        latitude: lat,
        longitude: long,
      });
      const url = await uploadImage(postImg, Date.now(), "postsPicture");
      const data = {
        userId,
        picture: url,
        title: postTitle,
        location: { region: postRegion, country: region[0].country },
        coordinates: { lat, long },
        comments: 0,
        likes: [],
        createdAt: date.toISOString(),
      };
      await addPostToStorage(data);
      clearPostForm();
      navigation.navigate("Posts");
    } catch (error) {
      Alert.alert("Oops something went wrong!");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = () => {
    clearPostForm();
  };

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync();
        setPostImg(uri);
      } catch (error) {
        console.error(error);
        Alert.alert("No access to camera");
      }
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && <Loader />}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View style={{ marginTop: 32 }}>
            <KeyboardAvoidingView
              keyboardVerticalOffset={120}
              behavior={Platform.OS == "ios" ? "padding" : "height"}
              style={{
                justifyContent: "flex-end",
              }}
            >
              <View style={styles.imgContainer}>
                {isFocused && hasCameraPermission && !postImg ? (
                  <Camera
                    ref={cameraRef}
                    style={styles.camera}
                    type={Camera.Constants.Type.back}
                    ratio="1:1"
                  />
                ) : (
                  postImg && (
                    <ImageBackground
                      source={{
                        uri: postImg,
                      }}
                      style={styles.imgBackground}
                    />
                  )
                )}
                {!postImg && (
                  <Pressable onPress={takePicture} style={styles.cameraBtn}>
                    <FontAwesome name="camera" size={25} color="#BDBDBD" />
                  </Pressable>
                )}
              </View>
              <Text style={styles.textTitle}>
                {true ? "Upload your picture" : "Edit picture"}
              </Text>
              <View style={styles.formContainer}>
                <TextInput
                  style={styles.inputField}
                  onChangeText={(text) => setPostTitle(text)}
                  ref={inputTitle}
                  name="title"
                  placeholder="Enter title..."
                  placeholderTextColor="#BDBDBD"
                  enablesReturnKeyAutomatically
                />
                <View style={styles.inputIcon}>
                  <EvilIcons
                    name="location"
                    size={25}
                    color="#BDBDBD"
                    style={{ height: 25 }}
                  />
                  <TextInput
                    style={{ flex: 1 }}
                    onChangeText={(text) => setPostRegion(text)}
                    ref={inputLocation}
                    name="location"
                    placeholder="Location..."
                    placeholderTextColor="#BDBDBD"
                    enablesReturnKeyAutomatically
                  />
                </View>
                <CustomButton
                  style={{ marginTop: 45 }}
                  onPress={onPressPublish}
                  title={isLoading ? "Publishing..." : "Publish"}
                  disabled={
                    !(!!postImg && !!postTitle && !!postRegion) || isLoading
                  }
                />
              </View>
            </KeyboardAvoidingView>
          </View>
          <Pressable onPress={handleDeletePost} style={styles.trashBtn}>
            <EvilIcons
              name="trash"
              size={25}
              color="#BDBDBD"
              style={{ height: 25 }}
            />
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#fff",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  imgContainer: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    overflow: "hidden",
  },
  imgBackground: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    alignItems: "center",
  },
  formContainer: {
    marginTop: 32,
  },
  inputField: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  inputIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
    paddingBottom: 10,
    marginTop: 16,
  },
  trashBtn: {
    width: 70,
    height: 40,
    alignSelf: "center",
    marginBottom: 32,
    backgroundColor: "#F6F6F6",
    paddingVertical: 8,
    paddingHorizontal: 23,
    borderRadius: 20,
  },
  cameraBtn: {
    height: 60,
    width: 60,
    backgroundColor: "#fff",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -30,
    marginLeft: -30,
    zIndex: 10,
  },
  textTitle: {
    color: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
    marginTop: 8,
  },
});
