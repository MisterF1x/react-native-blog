import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase/config";
import { showRegError } from "../helpers/registrationError";
import { logout, setIsLoading, signUp } from "./authSlice";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";

export const sighnUpUser = async (data, dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const { name, email, password, picture } = data;
    await createUserWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    await updateProfile(user, { displayName: name, photoURL: picture });
    dispatch(signUp({ userId: user.uid, name, email, picture }));
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

export const addPostToStorage = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), data);
    return docRef.id;
  } catch (error) {
    console.warn("Error while adding doc: ", error.message);
  }
};

export const addCommentToStorage = async (postId, data) => {
  try {
    await addDoc(collection(db, `posts/${postId}/comments`), data);
  } catch (error) {
    console.warn("Error while adding doc: ", error.message);
  }
};

export const setLike = async (postId, userId, action) => {
  const act = action === "add" ? arrayUnion(userId) : arrayRemove(userId);
  try {
    await updateDoc(doc(db, `posts/${postId}`), {
      likes: act,
    });
  } catch (error) {
    console.warn(error.message);
  }
};

export const incrementCommentCount = async (postId) => {
  try {
    const q = query(collection(db, `posts/${postId}/comments`));
    const snapshot = await getCountFromServer(q);

    await updateDoc(doc(db, `posts/${postId}`), {
      comments: snapshot.data().count + 1,
    });
  } catch (error) {
    console.warn(error.message);
  }
};

export const decrementCommentCount = async (postId) => {
  try {
    const q = query(collection(db, `posts/${postId}/comments`));
    const snapshot = await getCountFromServer(q);

    await updateDoc(doc(db, `posts/${postId}`), {
      comments: snapshot.data().count,
    });
  } catch (error) {
    console.warn(error.message);
  }
};

export const deleteDocsInCollection = async (id, collection) => {
  try {
    await deleteDoc(doc(db, collection, id));
  } catch (error) {
    console.warn(error.message);
  }
};

export const updateUrlInSubcollections = async (userId, url) => {
  try {
    const collectionSnapshot = await getDocs(collection(db, "posts"));

    collectionSnapshot.forEach(async (collectionDoc) => {
      const subcollectionRef = collection(
        db,
        `posts/${collectionDoc.id}/comments`
      );
      const querySnapshot = await getDocs(
        query(subcollectionRef, where("userId", "==", userId))
      );
      const batch = writeBatch(db);
      querySnapshot.forEach((subDoc) => {
        const docRef = doc(
          db,
          `posts/${collectionDoc.id}/comments/${subDoc.id}`
        );
        batch.update(docRef, { userPicture: url });
      });
      await batch.commit();
    });
  } catch (error) {
    console.error("Error updating field:", error);
  }
};
