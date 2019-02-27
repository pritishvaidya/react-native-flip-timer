import React from 'react';
import { View, Animated, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import style from '../style';

import TransformUtil from '../../utils';
import FlipCard from './flip-card';
import Card from './card';

const { width } = Dimensions.get('window');

class NumberCard extends React.Component {
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
        useNativeDriver: true,
      }),
      Animated.timing(this.rotateBack, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }

  transformRef = (ref, deg, y) => {
    const { perspective } = this.props;
    const matrix = TransformUtil.createIdentityMatrix();
    TransformUtil.translateMatrix(matrix, { x: 0, y, z: 0 });
    TransformUtil.perspectiveMatrix(matrix, perspective);
    TransformUtil.rotateXMatrix(matrix, deg);
    TransformUtil.untranslateMatrix(matrix, { x: 0, y, z: 0 });
    if (ref) {
      ref.setNativeProps({ style: { transform: [{ matrix }] } });
    }
  }

  render() {
    const {
      number, previousNumber, size, numberWrapperStyle, cardStyle, flipCardStyle, numberStyle,
    } = this.props;
    return (
      <View style={[style.numberWrapper,
        { width: size * 0.8, height: size * 1.2, borderRadius: size / 10 },
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

NumberCard.defaultProps = {
  size: width / 6,
  perspective: 250,
};

NumberCard.propTypes = {
  number: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  previousNumber: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  perspective: PropTypes.number,
  size: PropTypes.number,
  numberWrapperStyle: PropTypes.object,
  cardStyle: PropTypes.object,
  flipCardStyle: PropTypes.object,
  numberStyle: PropTypes.object,
};

export default NumberCard;
