// eslint-disable-next-line import/prefer-default-export
export const saveToClipBoard = (text) => {
  return new Promise((resolve, reject) => {
    navigator.clipboard.writeText(text).then(
      () => {
        resolve(text);
      },
      (e) => {
        reject(e);
      }
    );
  });
};
