import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase/config";
import { showRegError } from "../helpers/registrationError";
import {
  addPost,
  addUserPost,
  logout,
  setIsLoading,
  signUp,
} from "./authSlice";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const sighnUpUser = async (data, dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const { name, email, password, picture } = data;
    await createUserWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    await updateProfile(user, { displayName: name, photoURL: picture });
    dispatch(signUp({ userId: user.uid, name, email, picture }));
    await initPosts(dispatch);
    return user;
  } catch (error) {
    showRegError(error);
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const LogIn = async (data, dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const { email, password } = data;
    await signInWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    if (user) {
      dispatch(
        signUp({
          userId: user.uid,
          name: user.displayName,
          email,
          picture: user.photoURL,
        })
      );
      await initPosts(dispatch);
      await initUserPosts(dispatch, user.uid);
    }
    return user;
  } catch (error) {
    showRegError(error);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const LogOut = async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(logout());
  } catch (error) {
    console.warn(error.message);
  }
};

export const initUserPosts = async (dispatch, userId) => {
  const ref = query(
    collection(db, "posts"),
    orderBy("createdAt", "desc"),
    where("userId", "==", userId)
  );
  const docSnap = await getDocs(ref);
  docSnap.forEach((doc) => {
    if (doc.exists()) {
      dispatch(addUserPost({ postId: doc.id, ...doc.data() }));
    }
  });
};

export const initPosts = async (dispatch) => {
  const ref = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  const docSnap = await getDocs(ref);
  docSnap.forEach((doc) => {
    if (doc.exists()) {
      dispatch(addPost({ postId: doc.id, ...doc.data() }));
    }
  });
};

export const initComments = async (postId) => {
  let comments = [];
  const ref = collection(db, `posts/${postId}/comments`);
  const docSnap = await getDocs(ref);
  docSnap.forEach((doc) => {
    if (doc.exists()) {
      comments.push({ postId: doc.id, ...doc.data() });
    }
  });
  return comments;
};

export const addPostToStorage = async (data) => {
  try {
    await addDoc(collection(db, "posts"), data);
    console.log("Post is added.");
  } catch (error) {
    console.warn("Error while adding doc: ", error.message);
  }
};

export const addCommentToStorage = async (postId, data) => {
  try {
    await addDoc(collection(db, `posts/${postId}/comments`), data);
    console.log("Comment is added.");
  } catch (error) {
    console.warn("Error while adding doc: ", error.message);
  }
};

export const setLike = async (postId, data) => {
  try {
    await updateDoc(doc(db, `posts/${postId}`), data);
  } catch (error) {
    console.warn(error.message);
  }
};

export const updateCommentCount = async (postId, commentCount) => {
  try {
    await updateDoc(doc(db, `posts/${postId}`), { comments: commentCount + 1 });
  } catch (error) {
    console.warn(error.message);
  }
};
