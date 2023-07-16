import { format, parseISO } from "date-fns";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  Vibration,
  View,
} from "react-native";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import noUserImg from "../img/user.png";
import { PopupMenu } from "./PopupMenu";
import { useRef, useState } from "react";
import {
  decrementCommentCount,
  deleteDocsInCollection,
} from "../redux/operations";

export const Comment = ({ comment }) => {
  const ViewRef = useRef();
  const { userId } = useSelector(({ user }) => user.userInfo);
  const parsedDate = parseISO(comment.createdAt);
  const date = format(parsedDate, "dd MMMM yyyy | HH:mm");
  const [positioning, setPositioning] = useState({ x: null, y: null });
  const [visible, setVisible] = useState(false);

  const onClose = () => {
    setVisible(false);
  };
  const showPopup = () => {
    if (comment.userId === userId) {
      Vibration.vibrate(10);
      setVisible(true);
    }
  };

  const removeComment = async () => {
    await deleteDocsInCollection(
      comment.commentId,
      `posts/${comment.postId}/comments`
    );
    await decrementCommentCount(comment.postId);
    onClose();
  };

  return (
    <View
      ref={ViewRef}
      style={{
        flexDirection: comment.userId === userId ? "row-reverse" : "row",
        marginBottom: 24,
      }}
      onLayout={() => {
        ViewRef.current.measure((x, y, width, height, pageX, pageY) => {
          setPositioning({ x: pageX, y: pageY - height });
        });
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
          source={
            comment.userPicture ? { uri: comment.userPicture } : noUserImg
          }
          style={styles.userImgBackground}
        />
      </View>
      <Pressable onLongPress={showPopup} style={styles.commentContainer}>
        <Text style={styles.comment}>{comment.text}</Text>
        <Text style={styles.date}>{date}</Text>
      </Pressable>
      <PopupMenu
        pos={positioning}
        visible={visible}
        onClose={onClose}
        removeComment={removeComment}
      />
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
    userPicture: PropTypes.any,
  }),
};
