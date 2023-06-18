import { Pressable, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

export const CustomButton = ({
  style,
  onPress,
  title = "Sign Up",
  disabled = false,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Pressable
        disabled={disabled}
        style={[styles.button, disabled && { backgroundColor: "#F6F6F6" }]}
        onPress={onPress}
        android_ripple={{
          color: "#FFAF74",
          borderless: false,
        }}
      >
        <Text style={[styles.text, disabled && { color: "#BDBDBD" }]}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 100,
    height: 50,
  },
  button: {
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    height: 50,
    elevation: 4,
    justifyContent: "center",
    alignContent: "center",
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
  },
});

CustomButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object,
};
