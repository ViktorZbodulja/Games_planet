//Media resize
export const resizeImage = (imagePath, size) => {
  if (!imagePath) {
    return "";
  }
  const image = imagePath.match(/media\/screenshots/)
    ? imagePath.replace(
        "/media/screenshots",
        `/media/resize/${size}/-/screenshots`
      )
    : imagePath.replace("/media/games/", `/media/resize/${size}/-/games/`);
  return image;
};
