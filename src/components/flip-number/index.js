import React from 'react';
import { View, Animated } from 'react-native';
import PropTypes from 'prop-types';

import style from '../style';

import TransformUtil from '../../utils';
import FlipCard from './flip-card';
import Card from './card';

class FlipNumber extends React.PureComponent {
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
      size, wrapperStyle, cardStyle, flipCardStyle, numberStyle,
    } = this.props;

    return (
      <View style={[style.wrapper,
        { width: size, height: size * 1.2, borderRadius: size / 10 },
        wrapperStyle]}
      >
        <Card
          type="upper"
          size={size}
          number={10}
          cardStyle={cardStyle}
          numberStyle={numberStyle}
        />
        <Card
          type="lower"
          size={size}
          number={10}
          cardStyle={cardStyle}
          numberStyle={numberStyle}
        />
        <FlipCard
          setRef={this.setFrontRef}
          type="front"
          size={size}
          number={10}
          flipCardStyle={flipCardStyle}
          numberStyle={numberStyle}
        />
        <FlipCard
          setRef={this.setBackRef}
          type="back"
          size={size}
          number={10}
          flipCardStyle={flipCardStyle}
          numberStyle={numberStyle}
        />
      </View>
    );
  }
}

FlipNumber.defaultProps = {
  size: 200,
  wrapperStyle: {},
  cardStyle: {},
  flipCardStyle: {},
  numberStyle: {},
};

FlipNumber.propTypes = {
  size: PropTypes.number,
  wrapperStyle: PropTypes.object,
  cardStyle: PropTypes.object,
  flipCardStyle: PropTypes.object,
  numberStyle: PropTypes.object,
};

export default FlipNumber;
