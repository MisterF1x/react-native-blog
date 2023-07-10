import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";
import { showRegError } from "./registrationError";

export const uploadImage = async (uri, name, firebasePath) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const imageRef = ref(storage, `${firebasePath}/${name}.jpeg`);
    await uploadBytesResumable(imageRef, blob);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.log(error);
    showRegError(error);
  }
};
