/**
 * https://github.com/facebook/react-native/blob/master/Libraries/Utilities/MatrixMath.js
 * */
import MatrixMath from 'react-native/Libraries/Utilities/MatrixMath';

const { createIdentityMatrix } = MatrixMath;
const { multiplyInto } = MatrixMath;
/**
 *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/PI
 *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cos
 *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sin
 *  https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotateX
 * */
function rotateXMatrix(matrix, deg) {
  const rad = (Math.PI / 180) * deg;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const rotate = [
    1, 0, 0, 0,
    0, cos, -sin, 0,
    0, sin, cos, 0,
    0, 0, 0, 1,
  ];
  multiplyInto(matrix, matrix, rotate);
}

/**
 *  https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/perspective
 * */
function perspectiveMatrix(matrix, value) {
  const perspective = createIdentityMatrix();
  MatrixMath.reusePerspectiveCommand(perspective, value);
  multiplyInto(matrix, matrix, perspective);
}

/**
 *  https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate
 * */
function translateMatrix(matrix, origin) {
  const { x, y, z } = origin;
  const translate = createIdentityMatrix();
  MatrixMath.reuseTranslate3dCommand(translate, x, y, z);
  multiplyInto(matrix, translate, matrix);
}

function untranslateMatrix(matrix, origin) {
  const { x, y, z } = origin;
  const unTranslate = createIdentityMatrix();
  MatrixMath.reuseTranslate3dCommand(unTranslate, -x, -y, -z);
  multiplyInto(matrix, matrix, unTranslate);
}

export default {
  createIdentityMatrix,
  multiplyInto,
  rotateXMatrix,
  perspectiveMatrix,
  translateMatrix,
  untranslateMatrix,
};
