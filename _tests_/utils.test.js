import MatrixMath from 'react-native/Libraries/Utilities/MatrixMath';
import TransformUtils from '../src/utils';

describe('Testing Utility functions', () => {
  describe('rotateXMatrix utility method', () => {
    it('should rotate matrix', () => {
      const matrix = MatrixMath.createIdentityMatrix();
      const deg = 90;
      TransformUtils.rotateXMatrix(matrix, deg);
      const rad = (Math.PI / 180) * deg;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      const rotatedMatrix = [
        1, 0, 0, 0,
        0, cos, -sin, 0,
        0, sin, cos, 0,
        0, 0, 0, 1,
      ];

      expect(
        matrix,
      ).toEqual(rotatedMatrix);
    });
  });

  describe('perspectiveMatrix utility method', () => {
    it('should set perspective matrix', () => {
      const matrix = MatrixMath.createIdentityMatrix();
      const value = 1000;
      TransformUtils.perspectiveMatrix(matrix, value);

      const perspectiveMatrix = MatrixMath.createIdentityMatrix();
      const perspective = MatrixMath.createIdentityMatrix();
      MatrixMath.reusePerspectiveCommand(perspective, value);
      TransformUtils.multiplyInto(perspectiveMatrix, perspectiveMatrix, perspective);

      expect(
        matrix,
      ).toEqual(perspectiveMatrix);
    });
  });

  describe('translateMatrix utility method', () => {
    it('should translate matrix', () => {
      const matrix = MatrixMath.createIdentityMatrix();
      const origin = { x: 1, y: 1, z: 1 };
      TransformUtils.translateMatrix(matrix, origin);

      const translateMatrix = MatrixMath.createIdentityMatrix();
      const translate = MatrixMath.createIdentityMatrix();
      MatrixMath.reuseTranslate3dCommand(translate, origin.x, origin.y, origin.z);
      TransformUtils.multiplyInto(translateMatrix, translate, translateMatrix);

      expect(
        matrix,
      ).toEqual(translateMatrix);
    });
  });

  describe('untranslateMatrix utility method', () => {
    it('should untranslate matrix', () => {
      const matrix = MatrixMath.createIdentityMatrix();
      const origin = { x: 1, y: 1, z: 1 };
      TransformUtils.untranslateMatrix(matrix, origin);

      const untranslateMatrix = MatrixMath.createIdentityMatrix();
      const unTranslate = MatrixMath.createIdentityMatrix();
      MatrixMath.reuseTranslate3dCommand(unTranslate, -origin.x, -origin.y, -origin.z);
      TransformUtils.multiplyInto(untranslateMatrix, untranslateMatrix, unTranslate);
      expect(
        matrix,
      ).toEqual(untranslateMatrix);
    });
  });

  describe('formatNumberToTime utility method', () => {
    it('should format number to time', () => {
      const number = 600;
      expect(
        TransformUtils.formatNumberToTime(number),
      ).toEqual({ hours: '00', minutes: 10, seconds: '00' });
    });
  });

  describe('addTime utility method', () => {
    it('should return time less than threshold', () => {
      const hours = 9;
      const minutes = 1;
      const seconds = 2;

      const time = TransformUtils.addTime(hours, minutes, seconds);
      expect(
        time,
      ).toEqual({ hours: '09', minutes: '01', seconds: '03' });
    });

    it('should return minutes greater than threshold', () => {
      const hours = 8;
      const minutes = 61;
      const seconds = 2;

      const time = TransformUtils.addTime(hours, minutes, seconds);
      expect(
        time,
      ).toEqual({ hours: '09', minutes: '01', seconds: '03' });
    });
  });
});
