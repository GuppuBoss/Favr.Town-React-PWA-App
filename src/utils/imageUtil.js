// eslint-disable-next-line import/prefer-default-export
export const toGrayScale = (input, output) => {
  const inputContext = input.getContext('2d');
  const imageData = inputContext.getImageData(0, 0, input.width, input.height);
  const { data } = imageData;

  // Get length of all pixels in image each pixel made up of 4 elements for each pixel, one for Red, Green, Blue and Alpha
  const arrayLength = input.width * input.height * 4;
  // Go through each pixel from bottom right to top left and alter to its gray equiv

  // Common formula for converting to grayscale.
  // gray = 0.3*R + 0.59*G + 0.11*B
  for (let i = arrayLength - 1; i > 0; i -= 4) {
    // R= i-3, G = i-2 and B = i-1
    // Get our gray shade using the formula
    const gray = 0.3 * data[i - 3] + 0.59 * data[i - 2] + 0.11 * data[i - 1];
    // Set our 3 RGB channels to the computed gray.
    data[i - 3] = gray;
    data[i - 2] = gray;
    data[i - 1] = gray;
  }

  // get the output context
  const outputContext = output.getContext('2d');

  // Display the output image
  outputContext.putImageData(imageData, 0, 0);
};
