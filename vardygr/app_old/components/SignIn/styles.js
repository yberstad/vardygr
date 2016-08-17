import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    main: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginHorizontal: 20,
        marginVertical: 5,
        padding: 5
    },
    buttons: {
        flexDirection: 'row'
    },
    error: {
        color: 'red',
        height: 20
    }    
});


