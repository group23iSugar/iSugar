import moment from 'moment';

     const timeDiffrence = function(t) { 
        var timeUser = new Date(t);
        var currentTime = new Date();
        var currentHour = currentTime.getHours();
        var userHour = timeUser.getHours();
        return currentHour - userHour;
    }
    
export default timeDiffrence;