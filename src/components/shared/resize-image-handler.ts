import Resizer from "react-image-file-resizer";

const resizeImagesFileHandler = async (
  files: File[],
  width: number = 500,
  height: number = 500
) => {
  const resizeImage = (file: File): Promise<File> =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        width,
        height,
        "WEBP",
        80,
        0,
        (resizedImage) => {
          if (resizedImage instanceof File) {
            resolve(resizedImage);
          } else {
            resolve(file);
          }
        },
        "file"
      );
    });

  const resizedImages = await Promise.all(
    files.map((file: File) => resizeImage(file))
  );

  return resizedImages;
};

export default resizeImagesFileHandler;

