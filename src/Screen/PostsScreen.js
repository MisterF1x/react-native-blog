import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { UserInfo } from "../components/UserInfo";
import { data } from "../data";
import { Post } from "../components/Post";
import { useCallback, useState } from "react";
import { Skeleton } from "../components/Skeleton";

export const PostsScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert("Page is refreshed!!!");
    }, 2000);
  }, []);
  if (refreshing) {
    return (
      <View style={{ flex: 1, backgroundColor: "white", padding: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Skeleton style={{ width: 60, height: 60 }} />
          <View style={{ marginLeft: 10 }}>
            <Skeleton style={{ width: 110, height: 12, marginBottom: 8 }} />
            <Skeleton style={{ width: 110, height: 8 }} />
          </View>
        </View>
        <View style={{ marginVertical: 30 }}>
          <Skeleton style={{ height: 240 }} />
          <Skeleton style={{ width: 150, height: 12, marginVertical: 8 }} />
          <Skeleton style={{ height: 20 }} />
        </View>
        <View>
          <Skeleton style={{ height: 240 }} />
          <Skeleton style={{ width: 150, height: 12, marginVertical: 8 }} />
          <Skeleton style={{ height: 20 }} />
        </View>
      </View>
    );
  }
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.scrollBox}
    >
      <UserInfo />
      {data.map((post, inx) => {
        return <Post key={inx + "-p"} post={post} />;
      })}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollBox: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  titleContainer: {
    marginVertical: 8,
  },
});
