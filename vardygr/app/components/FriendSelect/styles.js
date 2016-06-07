import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60,
        marginBottom: 60
    },
    list_container: {
        flex: 1,
        marginBottom: 120,
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },
    row_container: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    row_container_selected: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#A7A7A7'
    },
    row_text: {
        marginLeft: 12,
        fontSize: 16,
    },
    row_photo: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    buttons: {
        flexDirection: 'row'
    },
});