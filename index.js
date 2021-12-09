/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './stackNav';
import {name as appName} from './app.json';

var React = require('react-native');
var SQLite = require('react-native-sqlite-storage')

AppRegistry.registerComponent(appName, () => App);
