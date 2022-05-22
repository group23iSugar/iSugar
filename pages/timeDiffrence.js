/* eslint-disable prettier/prettier */
/* eslint-disable semi */

     const timeDiffrence = function(t) {
        var timeUser = new Date(t);
        var currentTime = new Date();
        var currentHour = currentTime.getHours();
        var userHour = timeUser.getHours();
        console.log('diff: ' + currentHour - userHour);
        return currentHour - userHour;
    }
export default timeDiffrence;
