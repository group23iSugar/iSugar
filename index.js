/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './stackNav';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';

var React = require('react-native');
var SQLite = require('react-native-sqlite-storage');

PushNotification.configure({
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
    },
    requestPermissions: Platform.OS === 'ios',
  });

  PushNotification.createChannel(
    {
      channelId: 'channel-id', // (required)
      channelName: 'My channel', // (required)
    },
  );
AppRegistry.registerComponent(appName, () => App);
