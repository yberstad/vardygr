import React from 'react';
import {ScrollView, View, TouchableHighlight, Text, Image, ListView, DataSource} from 'react-native';
import Home from './Home';
import Routes from '../../config/routes';
import styles from './styles';
import images from '../../config/images';

const HomeContainer = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={styles.button}
          >
          <View style={styles.innerContainer}>
            <Text style={styles.label}>From</Text>
            <View style={styles.row}>
              <View style={styles.leftColumn}>
                <Text style={styles.textLargeBold}>
                  Tørberget
                </Text>
              </View>
              <View style={styles.rightColumn}>
                <Image
                  style={styles.buttonImage}
                  source={images.arrowRight}
                />
              </View>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          >
          <View style={styles.innerContainer}>
            <Text style={styles.label}>Travelling towards</Text>
            <View style={styles.row}>
              <View style={styles.leftColumn}>
                <Text style={styles.textLargeBold}>
                  Oslo
                </Text>
              </View>
              <View style={styles.rightColumn}>
                <Image
                  style={styles.buttonImage}
                  source={images.arrowRight}
                />
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </View>
      <View style={styles.timeContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.label}>First arrival</Text>
          {(() => {
            if(true) {
              return (
                <View style={styles.minutesContainer}>
                  <Text style={styles.textXlargeImportant}>
                    8
                    <Text style={styles.textXsmallImportant}>min</Text>
                  </Text>
                </View>
              )
            }
            else if(false) {
              return <Text style={styles.textXlargeImportant}>{getTimeAsString(firstArrival.time)}</Text>
            }
            else{
              return <Text style={styles.textXlargeImportant}>-</Text>
            }
          })()}
        </View>
      </View>
      <View style={styles.timeContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.label}>Next arrival(s)</Text>
        </View>
      </View>
    </ScrollView>
  );
};

HomeContainer.propTypes = {
  navigator: React.PropTypes.object,
};

export default HomeContainer;
