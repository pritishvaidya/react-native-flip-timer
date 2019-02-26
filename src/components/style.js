import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  numberWrapper: {
    backgroundColor: '#333333',
  },
  card: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#cccccc',
    overflow: 'hidden',
  },
  number: {
    fontWeight: '700',
    color: '#cccccc',
  },
  flipCard: {
    position: 'absolute',
    left: 0,
    height: '50%',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#333333',
    borderColor: '#cccccc',
    backfaceVisibility: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
