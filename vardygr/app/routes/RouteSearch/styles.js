import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  label: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight:'400',
    color: colors.labelText,
  },
  input: {
    height: 40,
    borderRadius: 5,
    backgroundColor: colors.inputBackground,
    marginLeft: 10,
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
});
