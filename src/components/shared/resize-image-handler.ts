import Resizer from "react-image-file-resizer";

const resizeImagesFileHandler = async (
  files: File[],
  width: number = 600,
  height: number = 600
) => {
  const imageFiles: File[] = files.filter((file) =>
    file.type.startsWith("image/")
  );
  const videoFiles: File[] = files.filter((file) =>
    file.type.startsWith("video/")
  );

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

  const resizedImages = await Promise.all(imageFiles.map(resizeImage));

  return [...videoFiles, ...resizedImages];
};

export default resizeImagesFileHandler;

