/* eslint-disable prettier/prettier */
import PushNotification from 'react-native-push-notification';

const handleScheduleNotification = (title, message, time) => {
PushNotification.localNotification({
    channelId: 'channel-id',
    title: title,
    message: message,
    date: new Date(Date.now() + (time * 60 * 1000)),
});
};
export {handleScheduleNotification};
