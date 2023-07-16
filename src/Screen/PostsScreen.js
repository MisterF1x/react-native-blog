import { StyleSheet, View, FlatList } from "react-native";
import { UserInfo } from "../components/UserInfo";
import { Post } from "../components/Post";
import { useCallback, useEffect, useState } from "react";
import { Skeleton } from "../components/Skeleton";

import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const PostsScreen = () => {
  const [refreshing, setRefreshing] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const ref = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const subscribe = onSnapshot(ref, (querySnapshot) => {
      setPosts([]);
      querySnapshot.forEach((doc) => {
        setPosts((state) => [...state, { postId: doc.id, ...doc.data() }]);
      });
      setRefreshing(false);
    });

    return () => {
      subscribe();
    };
  }, []);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      setPosts([]);

      const ref = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const docSnap = await getDocs(ref);
      docSnap.forEach((doc) => {
        if (doc.exists()) {
          setPosts((state) => [...state, { postId: doc.id, ...doc.data() }]);
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  if (refreshing) {
    return (
      <View style={{ flex: 1, backgroundColor: "white", padding: 16 }}>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 16 }}
        >
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
    <View style={styles.scrollBox}>
      <UserInfo />
      <FlatList
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={250}
        data={posts}
        refreshing={refreshing}
        onRefresh={onRefresh}
        keyExtractor={(post) => post.postId}
        renderItem={({ item }) => <Post post={item} />}
      />
    </View>
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
  text: {
    fontSize: 22,
    fontWeight: 700,
    textTransform: "uppercase",
    color: "#BDBDBD",
    textAlign: "center",
  },
});
