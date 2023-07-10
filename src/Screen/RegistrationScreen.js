import {
  ImageBackground,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import IconE from "react-native-vector-icons/Entypo";
import { CustomButton } from "../components/Button";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import { useEffect, useRef, useState } from "react";
import BgImage from "../img/bg.png";
import { constant } from "../constant";
import { useNavigation } from "@react-navigation/native";
import { ProfileAvatar } from "../components/ProfileAvatar";
import { sighnUpUser } from "../redux/operations";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../components/Loader";

export const RegistrationScreen = () => {
  const isLoading = useSelector(({ user }) => user.isLoading);
  const { picture } = useSelector(({ user }) => user.userInfo);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [isFocused, setIsFocused] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const inputName = useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();

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

  const onFocusHandler = (name) => {
    setIsFocused({
      [name]: true,
    });
  };
  const onBlurHandler = (name) => {
    setIsFocused({
      [name]: false,
    });
  };

  const submitHandler = async () => {
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      return ToastAndroid.show("All fields are required", ToastAndroid.SHORT);
    }
    if (constant.regExpEmail.test(formData.email) === false) {
      return ToastAndroid.show("Incorrect email address", ToastAndroid.SHORT);
    }
    const data = { ...formData, picture };
    const user = await sighnUpUser(data, dispatch);
    if (!user) return null;

    inputName.current.clear();
    inputEmail.current.clear();
    inputPassword.current.clear();
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    navigation.navigate("Home");
  };

  return (
    <>
      {isLoading && <Loader />}
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <ImageBackground
          source={BgImage}
          resizeMode="cover"
          style={[styles.bgImage, keyboardVisible && { marginBottom: -200 }]}
        >
          <View style={styles.box}>
            <ProfileAvatar />
            <Text style={styles.text}>Sign Up</Text>
            <TextInput
              ref={inputName}
              style={[styles.input, isFocused.name && styles.inputFocused]}
              onFocus={() => onFocusHandler("name")}
              onBlur={() => onBlurHandler("name")}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Username"
              placeholderTextColor="#BDBDBD"
            />
            <TextInput
              ref={inputEmail}
              style={[styles.input, isFocused.email && styles.inputFocused]}
              onFocus={() => onFocusHandler("email")}
              onBlur={() => onBlurHandler("email")}
              onChangeText={(text) => {
                setFormData({ ...formData, email: text });
              }}
              keyboardType="email-address"
              placeholder="Email"
              placeholderTextColor="#BDBDBD"
            />
            <View
              style={[
                styles.inputContainer,
                isFocused.password && styles.inputFocused,
              ]}
            >
              <TextInput
                ref={inputPassword}
                style={styles.inputField}
                onFocus={() => onFocusHandler("password")}
                onBlur={() => onBlurHandler("password")}
                onChangeText={(text) =>
                  setFormData({ ...formData, password: text })
                }
                name="password"
                placeholder="Enter password"
                placeholderTextColor="#BDBDBD"
                textContentType="newPassword"
                secureTextEntry={passwordVisibility}
                enablesReturnKeyAutomatically
              />
              <Pressable onPress={handlePasswordVisibility}>
                <IconE name={rightIcon} size={25} color="#1B4371" />
              </Pressable>
            </View>
            <CustomButton style={{ marginTop: 45 }} onPress={submitHandler} />
            <View style={styles.notice}>
              <Text style={{ color: "#1B4371" }}>Already have an account?</Text>
              <Text
                style={{ fontWeight: 700, color: "#1B4371", marginLeft: 3 }}
                onPress={() => navigation.navigate("Login")}
              >
                Login
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: "auto",
    paddingBottom: 75,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  text: {
    marginBottom: 32,
    marginTop: 32,
    fontFamily: "Roboto",
    fontSize: 30,
    lineHeight: 35,
    fontWeight: 500,
    textAlign: "center",
  },
  input: {
    height: 50,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    padding: 16,
  },
  inputFocused: {
    borderColor: "#FF6C00",
    backgroundColor: "#fff",
  },
  avatarBox: {
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    height: 120,
    width: 120,
    alignSelf: "center",
    marginTop: -60,
  },
  iconBtn: { position: "absolute", bottom: 14, right: -12 },
  inputContainer: {
    backgroundColor: "#F6F6F6",
    width: "100%",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  inputField: {
    height: 50,
    padding: 16,
    width: "90%",
  },
  bgImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
  notice: { flexDirection: "row", justifyContent: "center", marginTop: 16 },
});
