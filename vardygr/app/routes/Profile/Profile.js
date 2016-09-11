import React from 'react';
import { Text, View, Image } from 'react-native';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';
import images from '../../config/images';
import { capitalize } from '../../lib/string';
import styles from './styles';
import FBSDK, { LoginButton } from 'react-native-fbsdk';

const Profile = (props) => {
  const { user, signOut, onInsertTestDataPress, onStartBeacon1Press, onStopBeaconPress } = props;
  let email;

  if (user) {
    email = user.emails[0].address;
  }

  return (
    <View style={styles.container}>
      <Image style={styles.header} source={images.profileHeader} />
      <View style={styles.body}>
        <Avatar email={email} />
        <Text>{capitalize(email)}</Text>
        <Button text="Sign Out" onPress={signOut} />
        <LoginButton
            onLogoutFinished={signOut} />
        <Button
            text="Create Test Data (do not press)"
            onPress={onInsertTestDataPress}
        />
        <Button
            text="Start Beacon 1"
            onPress={onStartBeacon1Press}
        />
        <Button
            text="Stop Beacon"
            onPress={onStopBeaconPress}
        />
      </View>
    </View>
  );
};

Profile.propTypes = {
  user: React.PropTypes.object,
  signOut: React.PropTypes.func,
  onInsertTestDataPress: React.PropTypes.func,
  onStartBeacon1Press: React.PropTypes.func,
  onStopBeaconPress: React.PropTypes.func
};

export default Profile;
