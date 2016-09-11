import React, { PropTypes } from 'react';
import { Text, View, TextInput } from 'react-native';
import Button from '../../components/Button';
import Meteor, { MeteorComplexListView } from 'react-native-meteor';
import Loading from '../../components/Loading';
import styles from './styles';

function renderItem(stop, goToRouteTracker) {
  return <Button
    key={stop._id}
    text={stop.name}
    onPress={() => goToRouteTracker(stop)}
  />;
}

const RouteSearch = ({
  detailsReady,
  goToRouteTracker,
  searchStops,
  searchStopsResult}) =>
{
  if (!detailsReady) {
    return <Loading />;
  }
  
  let result;
  if(searchStopsResult){
    result = searchStopsResult.map(stop =>{
      return renderItem(stop, goToRouteTracker);
    });
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Search for stops:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(searchText) => searchStops(searchText)}/>
      {result}
    </View>
  );
};

RouteSearch.propTypes = {
  detailsReady: React.PropTypes.bool,
  goToRouteTracker: React.PropTypes.func,
  searchStops: React.PropTypes.func,
  searchStopsResult: React.PropTypes.array,
};

export default RouteSearch;
