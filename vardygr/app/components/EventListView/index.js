import React, { Component } from 'react';
import { ListView, DataSource, View, Text, Image } from 'react-native';
import styles from './styles';

const Row = (props) => (
    <View style={styles.container}>
        <Text style={styles.text}>
            {`${props.event.title} `}
        </Text>
    </View>
);

export default class EventListView extends Component {
    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.props.eventList)
        };
    }
    render() {
        return (
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={(data) => <Row {...data} />}
            />
        );
    }
}