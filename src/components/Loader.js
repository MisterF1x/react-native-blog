import { ActivityIndicator, StyleSheet, View } from "react-native";

export const Loader = () => {
  return (
    <View style={styles.backdrop}>
      <ActivityIndicator size="large" color="#FF6C00" />
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    zIndex: 3,
    justifyContent: "center",
  },
});
