import React from 'react';
import { View, Text, Animated } from 'react-native';
import PropTypes from 'prop-types';

import style from './style';

import TransformUtil from '../utils';

class FlipNumber extends React.Component {
  constructor(props) {
    super(props);
    this.rotateFront = new Animated.Value(0);
    this.rotateBack = new Animated.Value(-180);

    this.frontRef = null;
    this.backRef = null;
  }

  componentDidMount() {
    const { size } = this.props;
    this.animateTick();
    this.rotateFront.addListener(({ value }) => {
      this.transformRef(this.frontRef, value, size * 0.3);
    });

    this.rotateBack.addListener(({ value }) => {
      this.transformRef(this.backRef, value, -size * 0.3);
    });
  }

  setFrontRef = (ref) => {
    this.frontRef = ref;
  }

  setBackRef = (ref) => {
    this.backRef = ref;
  }

  animateTick = () => {
    Animated.parallel([
      Animated.timing(this.rotateFront, {
        toValue: 180,
        duration: 1000,
      }),
      Animated.timing(this.rotateBack, {
        toValue: 0,
        duration: 1000,
      }),
    ]).start();
  }

  transformRef = (ref, deg, y) => {
    const matrix = TransformUtil.createIdentityMatrix();
    TransformUtil.translateMatrix(matrix, { x: 0, y, z: 0 });
    TransformUtil.perspectiveMatrix(matrix, 1000);
    TransformUtil.rotateXMatrix(matrix, deg);
    TransformUtil.untranslateMatrix(matrix, { x: 0, y, z: 0 });
    if (ref) {
      ref.setNativeProps({
        style: { transform: [{ matrix }] },
      });
    }
  }

  render() {
    const {
      size, wrapperStyle, upperCardStyle, lowerCardStyle, numberStyle,
    } = this.props;

    return (
      <View style={[style.wrapper,
        { width: size, height: size * 1.2, borderRadius: size / 10 },
        wrapperStyle]}
      >
        <View style={[style.upperCard, upperCardStyle]}>
          <Text style={[style.number, {
            transform: [{ translateY: size / 4.8 }], fontSize: size / 1.5, minHeight: size / 1.5,
          }, numberStyle]}
          >
            {'10'}
          </Text>
        </View>
        <View style={[style.lowerCard, lowerCardStyle]}>
          <Text style={[style.number, {
            transform: [{ translateY: -(size / 3) }], fontSize: size / 1.5, minHeight: size / 1.5,
          }, numberStyle]}
          >
            {'10'}
          </Text>
        </View>
        <Animated.View
          ref={this.setFrontRef}
          style={[style.flipCard,
            { top: 0, borderTopLeftRadius: size / 10, borderTopRightRadius: size / 10 }]}
        >
          <Text style={[style.number, {
            transform: [{ translateY: size / 4.8 }], fontSize: size / 1.5, minHeight: size / 1.5,
          }, numberStyle]}
          >
            {'10'}
          </Text>
        </Animated.View>
        <Animated.View
          ref={this.setBackRef}
          style={[style.flipCard,
            { top: '50%', borderBottomLeftRadius: size / 10, borderBottomRightRadius: size / 10 }]}
        >
          <Text style={[style.number, {
            transform: [{ translateY: -(size / 3) }], fontSize: size / 1.5, minHeight: size / 1.5,
          }, numberStyle]}
          >
            {'10'}
          </Text>
        </Animated.View>
      </View>
    );
  }
}

FlipNumber.defaultProps = {
  size: 200,
  wrapperStyle: {},
  upperCardStyle: {},
  lowerCardStyle: {},
  numberStyle: {},
};

FlipNumber.propTypes = {
  size: PropTypes.number,
  wrapperStyle: PropTypes.object,
  upperCardStyle: PropTypes.object,
  lowerCardStyle: PropTypes.object,
  numberStyle: PropTypes.object,

};

export default FlipNumber;
