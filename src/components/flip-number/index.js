import React from 'react';
import PropTypes from 'prop-types';

import NumberCard from './number-card';

function FlipNumber({
  number, unit, size, perspective, cardStyle, flipCardStyle, numberStyle,
}) {
  let previousNumber = number - 1;
  if (unit !== 'hours') {
    previousNumber = previousNumber === -1 ? 59 : previousNumber;
  } else {
    previousNumber = previousNumber === -1 ? 23 : previousNumber;
  }
  previousNumber = previousNumber < 10 ? `0${previousNumber}` : previousNumber;

  const numberSplit = number.toString().split('');
  const previousNumberSplit = previousNumber.toString().split('');

  return (
    <React.Fragment>
      <NumberCard
        number={numberSplit[0]}
        previousNumber={previousNumberSplit[0]}
        size={size}
        perspective={perspective}
        cardStyle={cardStyle}
        flipCardStyle={flipCardStyle}
        numberStyle={numberStyle}
      />
      <NumberCard
        number={numberSplit[1]}
        previousNumber={previousNumberSplit[1]}
        size={size}
        perspective={perspective}
        cardStyle={cardStyle}
        flipCardStyle={flipCardStyle}
        numberStyle={numberStyle}
      />
    </React.Fragment>
  );
}

FlipNumber.propTypes = {
  number: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  unit: PropTypes.string.isRequired,
  size: PropTypes.number,
  perspective: PropTypes.number,
  cardStyle: PropTypes.object,
  flipCardStyle: PropTypes.object,
  numberStyle: PropTypes.object,
};

export default FlipNumber;
