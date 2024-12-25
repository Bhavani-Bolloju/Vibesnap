import { storage } from "../config";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImages = async function (
  imageFiles: File[],
  folder: string = "posts"
) {

  const imageUpload = imageFiles.map(async (image, index) => {
    const imageRef = ref(storage, `${folder}/${Date.now()}_${index}`);
    await uploadBytes(imageRef, image);
    const url = await getDownloadURL(imageRef);

    const type = image.type.startsWith("image") ? "image" : "video";

    return { type, url };
  });

  const uploadedURLs = await Promise.all(imageUpload);
  return uploadedURLs;
};
