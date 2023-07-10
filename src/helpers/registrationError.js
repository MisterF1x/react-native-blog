import { ToastAndroid } from "react-native";

export const showRegError = (error) => {
  switch (error.code) {
    case "auth/email-already-in-use":
      ToastAndroid.show(
        "That email address is already in use!",
        ToastAndroid.SHORT
      );
      break;
    case "auth/invalid-email":
      ToastAndroid.show(
        "That email address is already in use!",
        ToastAndroid.SHORT
      );
      break;
    case "auth/weak-password":
      ToastAndroid.show("The password is too weak.", ToastAndroid.SHORT);
      break;
    case "auth/wrong-password":
      ToastAndroid.show("Wrong password. Try again.", ToastAndroid.SHORT);
      break;
    case "auth/invalid-email":
      ToastAndroid.show(
        "Incorrect email address. Try again.",
        ToastAndroid.SHORT
      );
      break;
    case "auth/user-not-found":
      ToastAndroid.show(
        "Your email and password do not match. Please try again.",
        ToastAndroid.SHORT
      );
      break;
    default:
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
      break;
  }
};
