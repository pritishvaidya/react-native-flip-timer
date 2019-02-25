import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import style from '../style';

function Card({
  type, size, number, cardStyle, numberStyle,
}) {
  return (
    <View style={[style.card, type === 'upper' ? { borderBottomWidth: 1 } : { borderTopWidth: 1 }, cardStyle]}>
      <Text style={[style.number, {
        transform: [type === 'upper' ? { translateY: size / 4.8 } : { translateY: -size / 3 }],
        fontSize: size / 1.5,
        minHeight: size / 1.5,
      }, numberStyle]}
      >
        {number}
      </Text>
    </View>
  );
}

Card.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  cardStyle: PropTypes.object.isRequired,
  numberStyle: PropTypes.object.isRequired,
};

export default Card;
