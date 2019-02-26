import React from 'react';
import { View, Animated } from 'react-native';
import PropTypes from 'prop-types';

import style from '../style';

import TransformUtil from '../../utils';
import FlipCard from './flip-card';
import Card from './card';

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

  shouldComponentUpdate(nextProps) {
    const { number } = this.props;
    if (nextProps.number !== number) {
      this.animateTick();
    }
    return true;
  }

  setFrontRef = (ref) => {
    this.frontRef = ref;
  }

  setBackRef = (ref) => {
    this.backRef = ref;
  }

  animateTick = () => {
    this.rotateFront.setValue(0);
    this.rotateBack.setValue(-180);
    Animated.parallel([
      Animated.timing(this.rotateFront, {
        toValue: 180,
        duration: 800,
      }),
      Animated.timing(this.rotateBack, {
        toValue: 0,
        duration: 800,
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
      ref.setNativeProps({ style: { transform: [{ matrix }] } });
    }
  }

  render() {
    const {
      number, unit, size, numberWrapperStyle, cardStyle, flipCardStyle, numberStyle,
    } = this.props;
    let previousNumber = number - 1;

    if (unit !== 'hours') {
      previousNumber = previousNumber === -1 ? 59 : previousNumber;
    } else {
      previousNumber = previousNumber === -1 ? 23 : previousNumber;
    }
    previousNumber = previousNumber < 10 ? `0${previousNumber}` : previousNumber;

    return (
      <View style={[style.numberWrapper,
        { width: size, height: size * 1.2, borderRadius: size / 10 },
        numberWrapperStyle]}
      >
        <Card
          type="upper"
          size={size}
          number={number}
          cardStyle={cardStyle}
          numberStyle={numberStyle}
        />
        <Card
          type="lower"
          size={size}
          number={previousNumber}
          cardStyle={cardStyle}
          numberStyle={numberStyle}
        />
        <FlipCard
          setRef={this.setFrontRef}
          type="front"
          size={size}
          number={previousNumber}
          flipCardStyle={flipCardStyle}
          numberStyle={numberStyle}
        />
        <FlipCard
          setRef={this.setBackRef}
          type="back"
          size={size}
          number={number}
          flipCardStyle={flipCardStyle}
          numberStyle={numberStyle}
        />
      </View>
    );
  }
}

FlipNumber.defaultProps = {
  size: 60,
};

FlipNumber.propTypes = {
  number: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  unit: PropTypes.string.isRequired,
  size: PropTypes.number,
  numberWrapperStyle: PropTypes.object,
  cardStyle: PropTypes.object,
  flipCardStyle: PropTypes.object,
  numberStyle: PropTypes.object,
};

export default FlipNumber;
