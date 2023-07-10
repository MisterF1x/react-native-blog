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
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../components/Loader";
import { LogIn } from "../redux/operations";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(({ user }) => user.isLoading);

  const navigation = useNavigation();
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const inputEmail = useRef();
  const inputPassword = useRef();

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });
    return subscriber();
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

  const submitHandler = async () => {
    if (!formData.email.trim() || !formData.password.trim()) {
      ToastAndroid.show("All fields are required", ToastAndroid.SHORT);
      return;
    }
    if (constant.regExpEmail.test(formData.email) === false) {
      ToastAndroid.show("Incorrect email address", ToastAndroid.SHORT);
      return;
    }

    const user = await LogIn(formData, dispatch);
    if (!user) return null;

    inputEmail.current.clear();
    inputPassword.current.clear();
    setFormData({
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
          style={[styles.image, keyboardVisible && { marginBottom: -200 }]}
        >
          <View style={styles.box}>
            <Text style={styles.text}>LogIn</Text>
            <TextInput
              ref={inputEmail}
              style={[styles.input, isFocused.email && styles.inputFocused]}
              onFocus={() =>
                setIsFocused({
                  email: true,
                })
              }
              onBlur={() =>
                setIsFocused({
                  email: false,
                })
              }
              onChangeText={(text) => setFormData({ ...formData, email: text })}
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
                onFocus={() =>
                  setIsFocused({
                    password: true,
                  })
                }
                onBlur={() =>
                  setIsFocused({
                    password: false,
                  })
                }
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
            <CustomButton
              style={{ marginTop: 45 }}
              onPress={submitHandler}
              title="Login"
            />
            <View style={styles.notice}>
              <Text style={{ color: "#1B4371" }}>Don't have an account?</Text>
              <Text
                style={{ fontWeight: 700, color: "#1B4371", marginLeft: 3 }}
                onPress={() => navigation.navigate("Signup")}
              >
                Register Now
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
    paddingBottom: 100,
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
  image: {
    flex: 1,
    justifyContent: "center",
  },
  notice: { marginTop: 16, flexDirection: "row", justifyContent: "center" },
});
