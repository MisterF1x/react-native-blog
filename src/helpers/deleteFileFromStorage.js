import { ref, deleteObject } from "firebase/storage";
import { storage } from "../firebase/config";
import { showRegError } from "./registrationError";

export const deleteFileFromStorage = async (url) => {
  const path = getPathStorageFromUrl(url);
  const imgRef = ref(storage, path);
  try {
    await deleteObject(imgRef);
  } catch (error) {
    showRegError(error);
  }
};

function getPathStorageFromUrl(url) {
  const baseUrl =
    "https://firebasestorage.googleapis.com/v0/b/test-61831.appspot.com/o/";

  let imagePath = url.replace(baseUrl, "");
  const indexOfEndPath = imagePath.indexOf("?");
  imagePath = imagePath.substring(0, indexOfEndPath);
  imagePath = imagePath.replace("%2F", "/");

  return imagePath;
}
