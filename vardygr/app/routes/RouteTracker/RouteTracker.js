import React from 'react';
import {ScrollView, View, TouchableHighlight, Text, Image, ListView, DataSource} from 'react-native';
import Loading from '../../components/Loading';
import styles from './styles';
import images from '../../config/images';
import { getTimeAsString } from '../../lib/string';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

function renderRow(rowData)
{
    return (
      <View style={styles.row_container}>
          <Text style={styles.textLarge}>{getTimeAsString(rowData.time)}</Text>
      </View>
    );
}


const RouteTracker = ({
  ready,
  currentStop,
  direction,
  onSelectStop,
  onSelectDirection,
  arrivalList
}) =>{
    
    if (!ready) {
        return <Loading />;
    }
    var arrivalListClone = arrivalList.slice(0);
    var firstArrival = arrivalListClone.shift();
    let dataSource = ds.cloneWithRows(arrivalListClone);
    return (
      <ScrollView style={styles.scrollview}>
        <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={styles.button}
              onPress={onSelectStop}>
                <View>
                  <Text style={styles.label}>From</Text>
                  <Text style={styles.textLargeBold}>{currentStop}</Text>
                  <Image
                    style={styles.buttonImage}
                    source={images.rightArrow}
                  />
                </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              onPress={onSelectDirection}>
                <View>
                    <Text style={styles.label}>Travelling towards</Text>
                    <Text style={styles.textLargeBold}>{direction}</Text>
                    <Image
                      style={styles.buttonImage}
                      source={images.rightArrow}
                    />
                </View>
            </TouchableHighlight>
          </View>
        <View style={styles.timeContainer}>
          <Text style={styles.label}>First arrival</Text>
          {(() => {
            if(firstArrival && firstArrival.estimatedArrivalInMin) {
              return (
                <View style={styles.minutesContainer}>
                  <Text style={styles.textXlargeImportant}>
                    {firstArrival.estimatedArrivalInMin}
                    <Text style={styles.textXsmallImportant}>min</Text>
                  </Text>
                </View>
              )
            }
            else if(firstArrival && firstArrival.time) {
              return <Text style={styles.textXlargeImportant}>{getTimeAsString(firstArrival.time)}</Text>
            }
            else{
              return <Text>-</Text>
            }
          })()}
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.label}>Next arrival(s)</Text>
          <ListView
            enableEmptySections={true}
            style={styles.listViewContainer}
            dataSource={dataSource}
            renderRow={(data) => renderRow(data)} />
        </View>
      </ScrollView>
    );
};

RouteTracker.protoTypes = {
    ready: React.PropTypes.bool,
    currentStop: React.PropTypes.string,
    direction: React.PropTypes.string,
    onSelectStop: React.PropTypes.func,
    onSelectDirection: React.PropTypes.func,
    arrivalList: React.PropTypes.array
};

export default RouteTracker;