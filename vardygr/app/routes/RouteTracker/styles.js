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
  textLarge: {
    textAlign: 'left',
    fontSize: 36,
    fontWeight: '400',
    color: colors.labelText,
  },
  textLargeBold: {
    textAlign: 'left',
    fontSize: 34,
    fontWeight: '700',
    color: colors.labelText,
  },
  textXlargeImportant: {
    textAlign: 'center',
    fontSize: 86,
    fontWeight: '700',
    color: colors.importantText,
  },
  textXsmallImportant: {
    fontSize:16,
    fontWeight:'400'
  },
  button: {
    borderBottomWidth: 1,
    borderBottomColor: colors.hrColor,
    paddingVertical: 10
    
  },
  innerContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  timeContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.hrColor,
    paddingVertical: 10
  },
  buttonImage: {
    marginTop: 10,
    width: 25,
    height: 25,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  rowCentered: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  leftColumn: {
    flex:3,
    alignItems: 'flex-start',
  },
  rightColumn: {
    flex:1,
    alignItems: 'flex-end',
  }
});
