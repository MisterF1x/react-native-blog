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
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Comment } from "../components/Comment";
import { NoComment } from "../components/NoComment";
import { useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Skeleton } from "../components/Skeleton";

export const CommentsScreen = ({ route }) => {
  const { selectedPostObj } = route.params;
  const input = useRef();
  const [comment, setComment] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert("Comment screen is refreshed!!!");
    }, 2000);
  }, []);

  const onPressHandler = () => {
    input.current.clear();
    Keyboard.dismiss();
    console.log(comment);
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
            {selectedPostObj.comments.length ? (
              selectedPostObj.comments.map((comment, inx) => (
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
          onChangeText={(text) => setComment(text)}
          name="comment"
          placeholder="Add a comment..."
          placeholderTextColor="#BDBDBD"
        />
        <Pressable style={styles.btn} onPress={onPressHandler}>
          <AntDesign name="arrowup" size={25} color="#FFF" />
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
