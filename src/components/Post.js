import {
  Alert,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  Vibration,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import { deleteDocsInCollection, setLike } from "../redux/operations";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BottomModal } from "./BottomModal";
import { deleteFileFromStorage } from "../helpers/deleteFileFromStorage";

export const Post = ({ post, type = null }) => {
  const navigation = useNavigation();
  const { userId } = useSelector(({ user }) => user.userInfo);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    setLikes(post.likes);
  }, []);

  const [select, setSelect] = useState(false);

  const handleOnPressComment = () => {
    navigation.navigate("Comments", { selectedPostObj: post });
  };

  const handleOnPressLocation = () => {
    navigation.navigate("Map", { selectedPostObj: post.coordinates });
  };

  const handleSetLike = () => {
    Vibration.vibrate(10);
    const action = likes.includes(userId) ? "remove" : "add";
    setLike(post.postId, userId, action);
    if (action === "add") {
      setLikes((state) => [...state, userId]);
    } else {
      const result = likes.filter((like) => like !== userId);
      setLikes(result);
    }
  };

  const handleLongPress = () => {
    if (!type) return;
    Vibration.vibrate(10);
    setSelect(true);
  };
  const onCloseModal = () => {
    setSelect(false);
  };
  const removePost = () => {
    deleteFileFromStorage(post.picture);
    deleteDocsInCollection(post.postId, "posts");
    onCloseModal();
  };
  const handleDeletePost = () => {
    Alert.alert("Are you sure want to delete post? ", "Select below options", [
      {
        text: "Cancel",
        onPress: onCloseModal,
        style: "cancel",
      },
      {
        text: "OK",
        onPress: removePost,
      },
    ]);
  };

  return (
    <>
      <BottomModal
        onClose={onCloseModal}
        select={select}
        deletePost={handleDeletePost}
      />
      <Pressable onLongPress={handleLongPress}>
        <View style={{ marginBottom: 32 }}>
          <View style={styles.imgContainer}>
            {true && (
              <ImageBackground
                source={{
                  uri: post.picture,
                }}
                style={styles.imgBackground}
              />
            )}
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{post.title}</Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.rowVerticalCenter}>
              <View style={[styles.rowVerticalCenter, { marginRight: 24 }]}>
                <Pressable onPress={handleOnPressComment}>
                  <FontAwesome
                    name={post.comments > 0 ? "comment" : "comment-o"}
                    size={25}
                    color={post.comments > 0 ? "#FF6C00" : "#BDBDBD"}
                    style={{ height: 25, marginRight: 6 }}
                  />
                </Pressable>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 19,
                    color: "#212121",
                  }}
                >
                  {post.comments}
                </Text>
              </View>
              <View style={styles.rowVerticalCenter}>
                <Pressable onPress={handleSetLike}>
                  <Icon
                    name={likes.includes(userId) ? "like1" : "like2"}
                    size={25}
                    color="#FF6C00"
                    style={{ height: 25, marginRight: 6 }}
                  />
                </Pressable>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 19,
                    color: "#212121",
                  }}
                >
                  {likes.length || 0}
                </Text>
              </View>
            </View>
            <View style={styles.rowVerticalCenter}>
              <Pressable onPress={handleOnPressLocation}>
                <EvilIcons
                  name="location"
                  size={25}
                  color="#BDBDBD"
                  style={{ height: 25, marginRight: 4 }}
                />
              </Pressable>
              <Text style={styles.locationText}>
                {!!type && post.location?.region + ", "}
                {post.location?.country}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    marginVertical: 8,
  },
  title: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 19,
  },
  imgContainer: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#E8E8E8",
    overflow: "hidden",
  },
  imgBackground: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    alignItems: "center",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationText: {
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
  },
  rowVerticalCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
});

Post.propTypes = {
  picture: PropTypes.string,
  title: PropTypes.string,
  comments: PropTypes.array,
  likes: PropTypes.number,
  location: PropTypes.shape({
    region: PropTypes.string,
    country: PropTypes.string,
  }),
  type: PropTypes.string,
};

Post.defaultProps = {
  type: null,
};
