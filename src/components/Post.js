import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";

export const Post = ({ post, type = null }) => {
  const navigation = useNavigation();

  const handleOnPressComment = () => {
    navigation.navigate("Comments", { selectedPostObj: post });
  };
  const handleOnPressLocation = () => {
    navigation.navigate("Map", { selectedPostObj: post });
  };
  return (
    <View style={{ marginBottom: 32 }}>
      <View style={styles.imgContainer}>
        <ImageBackground
          source={{
            uri: post.picture,
          }}
          style={styles.imgBackground}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{post.title}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.rowVerticalCenter}>
          <View style={[styles.rowVerticalCenter, { marginRight: 24 }]}>
            <Pressable onPress={handleOnPressComment}>
              <FontAwesome
                name={post.comments.length > 0 ? "comment" : "comment-o"}
                size={25}
                color={post.comments.length > 0 ? "#FF6C00" : "#BDBDBD"}
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
              {post.comments.length}
            </Text>
          </View>
          {!!type && (
            <View style={styles.rowVerticalCenter}>
              <Icon
                name="like2"
                size={25}
                color="#FF6C00"
                style={{ height: 25, marginRight: 6 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 19,
                  color: "#212121",
                }}
              >
                {post.likes}
              </Text>
            </View>
          )}
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