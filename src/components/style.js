import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    backgroundColor: '#333333',
    overflow: 'hidden',
  },
  upperCard: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#cccccc',
    borderBottomWidth: 1,
    overflow: 'hidden',
  },
  lowerCard: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#cccccc',
    borderTopWidth: 1,
    overflow: 'hidden',
  },
  number: {
    flex: 1,
    fontWeight: '700',
    color: '#cccccc',
  },
});
