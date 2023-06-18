import { StyleSheet, Text, View } from "react-native";

export const NoComment = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>No comments</Text>
      <Text style={styles.text}>Under the post</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    borderTopColor: "#E8E8E8",
  },
  mainText: {
    fontSize: 22,
    fontWeight: 700,
    textTransform: "uppercase",
    color: "#BDBDBD",
  },
  text: {
    fontSize: 18,
    fontWeight: 300,
    textTransform: "uppercase",
    color: "#BDBDBD",
  },
});
