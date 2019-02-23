import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import style from './style';

class FlipNumber extends React.Component {
  state = {}

  render() {
    const {
      size, wrapperStyle, upperCardStyle, lowerCardStyle, numberStyle,
    } = this.props;
    return (
      <View style={[style.wrapper, {
        width: size,
        height: size * 1.2,
      }, wrapperStyle]}
      >
        <View style={[style.upperCard, upperCardStyle]}>
          <Text style={[style.number, {
            transform: [{
              translateY: size / 4.8,
            }],
            fontSize: size / 1.5,
            minHeight: size / 1.5,
          }, numberStyle]}
          >
            {'10'}
          </Text>
        </View>
        <View style={[style.lowerCard, lowerCardStyle]}>
          <Text style={[style.number, {
            transform: [{
              translateY: -(size / 3),
            }],
            fontSize: size / 1.5,
            minHeight: size / 1.5,
          }, numberStyle]}
          >
            {'10'}
          </Text>
        </View>
      </View>
    );
  }
}

FlipNumber.defaultProps = {
  size: 40,
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
