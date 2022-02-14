// eslint-disable-next-line import/prefer-default-export
export const getContentHeight = (heightToDecrease) => {
  const windowViewPoint = window.innerHeight;
  const heightOfFooter = heightToDecrease || 180;

  return windowViewPoint - heightOfFooter;
};
