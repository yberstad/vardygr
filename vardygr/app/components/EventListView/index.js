import React, { Component } from 'react';
import { ListView, DataSource, View, Text, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class EventListView extends Component {
    constructor(props) {
        super(props);
    }

    rowPressed(id){
        this.props.eventSetCurrent(id);
        Actions.eventOverview();
    }

    renderRow(rowData)
    {
        var imageUrl =  'https://graph.facebook.com/' + 1028115007225766 + '/picture?type=square';

        return (
            <TouchableHighlight onPress={() => this.rowPressed(rowData._id)} underlayColor='#dddddd'>
                <View style={styles.row_container}>
                    <Image source={{ uri: imageUrl}} style={styles.row_photo} />
                    <Text style={styles.row_text}>
                        {`${rowData.title}`}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        let dataSource = ds.cloneWithRows(this.props.eventList);
        return (
            <ListView
                enableEmptySections={true}
                style={styles.container}
                dataSource={dataSource}
                renderRow={(data) => this.renderRow(data)} />
        );
    }
}