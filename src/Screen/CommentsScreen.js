import {
  ImageBackground,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  ScrollView,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Comment } from "../components/Comment";
import { NoComment } from "../components/NoComment";
import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Skeleton } from "../components/Skeleton";
import {
  addCommentToStorage,
  initComments,
  updateCommentCount,
} from "../redux/operations";
import { useDispatch, useSelector } from "react-redux";
import { updateComments } from "../redux/authSlice";

export const CommentsScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(({ user }) => user);
  const { selectedPostObj } = route.params;
  const input = useRef();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setRefreshing(true);
        const data = await initComments(selectedPostObj.postId);
        setComments(data);
      } catch (error) {
        console.log(error);
      } finally {
        setRefreshing(false);
      }
    })();
  }, []);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      setComments([]);
      const data = await initComments(selectedPostObj.postId);
      setComments(data);
    } catch (error) {
      Alert.alert("Ooops something went wrong!");
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const onPressHandler = () => {
    const date = new Date(Date.now());
    const data = {
      createdAt: date.toISOString(),
      text: commentText,
      userId: userInfo.userId,
      userPicture: userInfo.picture,
    };
    try {
      setIsLoading(true);
      addCommentToStorage(selectedPostObj.postId, data);
      updateCommentCount(selectedPostObj.postId, selectedPostObj.comments);
      setComments([...comments, data]);
      dispatch(updateComments(selectedPostObj.postId));
      input.current.clear();
      Keyboard.dismiss();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {refreshing ? (
        <View style={{ flex: 1, backgroundColor: "white", marginTop: 32 }}>
          <View style={{ marginBottom: 30 }}>
            <Skeleton style={{ height: 240 }} />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Skeleton style={{ height: 28, width: 28, marginRight: 10 }} />
            <Skeleton style={{ flex: 1, height: 120 }} />
          </View>
          <View style={{ flexDirection: "row", marginVertical: 30 }}>
            <Skeleton style={{ flex: 1, height: 120 }} />
            <Skeleton style={{ height: 28, width: 28, marginLeft: 10 }} />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Skeleton style={{ height: 28, width: 28, marginRight: 10 }} />
            <Skeleton style={{ flex: 1, height: 120 }} />
          </View>
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Pressable onPress={Keyboard.dismiss}>
            <View style={styles.imgContainer}>
              <ImageBackground
                source={{
                  uri: selectedPostObj.picture,
                }}
                style={styles.imgBackground}
              />
            </View>
            {comments.length ? (
              comments.map((comment, inx) => (
                <Comment key={inx + "-C"} comment={comment} />
              ))
            ) : (
              <NoComment />
            )}
          </Pressable>
        </ScrollView>
      )}
      <View style={styles.form}>
        <TextInput
          ref={input}
          style={styles.inputField}
          onChangeText={(text) => setCommentText(text)}
          name="comment"
          placeholder="Add a comment..."
          placeholderTextColor="#BDBDBD"
        />
        <Pressable
          style={styles.btn}
          onPress={onPressHandler}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#d3d3d3" />
          ) : (
            <AntDesign name="arrowup" size={25} color="#FFF" />
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "#FFF",
  },
  imgContainer: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#E8E8E8",
    overflow: "hidden",
    marginVertical: 32,
  },
  imgBackground: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    alignItems: "center",
  },
  form: {
    backgroundColor: "#F6F6F6",
    width: "100%",
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    paddingRight: 8,
    marginTop: 8,
  },
  inputField: {
    height: 50,
    padding: 16,
    width: "90%",
  },
  btn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
  },
});

CommentsScreen.propTypes = {
  route: PropTypes.object.isRequired,
};
