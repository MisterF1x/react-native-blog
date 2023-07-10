import { format, parseISO } from "date-fns";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export const Comment = ({ comment }) => {
  const { userId } = useSelector(({ user }) => user.userInfo);
  const parsedDate = parseISO(comment.createdAt);
  const date = format(parsedDate, "dd MMMM yyyy | HH:mm");
  return (
    <View
      style={{
        flexDirection: comment.userId === userId ? "row-reverse" : "row",
        marginBottom: 24,
      }}
    >
      <View
        style={[
          styles.userContainer,
          comment.userId === userId
            ? { marginLeft: 16, backgroundColor: "#FF6C00" }
            : { marginRight: 16, backgroundColor: "#BDBDBD" },
        ]}
      >
        <ImageBackground
          source={{
            uri: comment.userPicture,
          }}
          style={styles.userImgBackground}
        />
      </View>
      <View style={styles.commentContainer}>
        <Text style={styles.comment}>{comment.text}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  userImgBackground: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    alignItems: "center",
  },
  commentContainer: {
    backgroundColor: "#F7F7F7",
    flex: 1,
    borderRadius: 6,
    padding: 16,
  },
  comment: {
    fontSize: 13,
    lineHeight: 18,
  },
  date: {
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
    textAlign: "right",
    marginTop: 8,
  },
});

Comment.propTypes = {
  comment: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    userPicture: PropTypes.string.isRequired,
  }),
};
