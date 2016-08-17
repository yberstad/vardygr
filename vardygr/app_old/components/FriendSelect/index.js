import React, { Component } from 'react';
import { ListView, DataSource, View, Text, Image, TouchableWithoutFeedback, RecyclerViewBackedScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from '../Button';
import styles from './styles';

export default class FriendSelect extends Component {
    constructor(props) {
        super(props);
        const { friendList, connected } = this.props.appState;
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.pressData = {};
        this.dataBlob = [];
        this.state = {
            dataSource: ds.cloneWithRows(this.initializeRows())
        }
    }

    validInput() {
        return true;
    }

    handleOk() {
        if (this.validInput()) {
            let friends = [];
            this.dataBlob.map((item) => {
                if(item.selected){
                    friends.push(item.friend);
                }
            });

            this.props.selectFriends(friends);
            Actions.pop();
        }
    }

    rowPressed(rowId){
        this.pressData[rowId] = !this.pressData[rowId];
        this.setState({dataSource: this.state.dataSource.cloneWithRows(
            this.generateRows(this.pressData)
        )});
    }

    initializeRows()
    {
        const { friendList } = this.props.appState;
        this.dataBlob = [];
        for (var ii = 0; ii < friendList.length; ii++) {
            let friend = friendList[ii];
            let index = this.props.selectedFriends.indexOf(friend.id);
            var item = {
                selected: index > -1,
                friend: friend
            };
            this.dataBlob.push(item);
            if(index > -1)
            {
                this.pressData[ii] = true;
            }
        }
        return this.dataBlob;
    }

    generateRows(pressData)
    {
        const { friendList } = this.props.appState;
        this.dataBlob = [];
        for (var ii = 0; ii < friendList.length; ii++) {
            var item = {
                selected: pressData[ii],
                friend: friendList[ii]
            };
           this.dataBlob.push(item);
        }
        return this.dataBlob;
    }

    renderRow(rowData, sectionID, rowID)
    {
        var imageUrl =  'https://graph.facebook.com/' + rowData.friend.id + '/picture?type=square';

        return (
            <TouchableWithoutFeedback onPress={() => this.rowPressed(rowID)} underlayColor='#dddddd'>
                <View style={rowData.selected ? styles.row_container_selected : styles.row_container}>
                    <Image source={{ uri: imageUrl}} style={styles.row_photo} />
                    <Text style={styles.row_text}>
                        {`${rowData.friend.name}`}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    render() {
        let ok;
        if (this.props.appState.connected) {
            ok = <Button text="OK" onPress={() => this.handleOk()}/>;
        }
        return (
            <View style={styles.container}>
                <ListView
                    enableEmptySections={true}
                    style={styles.list_container}
                    dataSource={this.state.dataSource}
                    renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
                    renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
                    renderRow={(data, sectionID, rowID) => this.renderRow(data, sectionID, rowID)} />

                {ok}
            </View>
        );
    }
}