import moment from 'moment';

     const timeCompare = function(from, to) { 
         var currentTimeInsideInterval = false;
        //====== parsing FROM ========//
         from = moment(from).format('h:mm a'); // delete this line if your format is h:mm a-------------
        console.log(from+' ......');
        var fullFrom = from.split(' ');
        var getFromTime = fullFrom[0].split(':');
        var getFromHour = parseInt(getFromTime[0]);
        var getFromMinutes = parseInt(getFromTime[1]);
        var FromPeriod = fullFrom[1];
        if (getFromHour < 12 && (FromPeriod == 'pm' || FromPeriod == 'PM' )){
            getFromHour = getFromHour+12;
        }
        if (getFromHour == 12 && (FromPeriod == 'am' || FromPeriod == 'AM' )){
            getFromHour = getFromHour-12;
        }
        //====== parsing TO ========//
         to = moment(to).format('h:mm a');  // delete this line if your format is h:mm a--------------------
        console.log(to+' ......');
        var fullTo = to.split(' ');
        var getToTime = fullTo[0].split(':');
        var getToHour = parseInt(getToTime[0]);
        var getToMinutes = parseInt(getToTime[1]);
        var ToPeriod = fullTo[1];
        if (getToHour < 12 && (ToPeriod == 'pm' || ToPeriod == 'PM' )){
            getToHour = getToHour+12;
        } 
        //==== parsing current Time ===//
        var currentDate = new Date();
        var currenTime = moment(currentDate).format('h:mm a');
        var fullCurrent = currenTime.split(' ');
        var getCurrentTime = fullCurrent[0].split(':');
        var getCurrentHour = parseInt(getCurrentTime[0]);
        var getCurrentMinutes = parseInt(getCurrentTime[1]);
        var CurrentPeriod = fullCurrent[1];
        if (getCurrentHour < 12 && (getCurrentHour == 'pm' || CurrentPeriod == 'PM' )){
            getCurrentHour = getCurrentHour+12;
        }
        if (getCurrentHour == 12 && (getCurrentHour == 'am' || getCurrentHour == 'AM' )){
            getCurrentHour = getCurrentHour-12;
        }
        // ====== comparing =======//

                          if (getFromHour < getToHour){
                  	if (((getCurrentHour > getFromHour) && (getCurrentHour < getToHour)) || 
                  	((getCurrentHour == getFromHour) && (getCurrentMinutes >= getFromMinutes)) ||
                  	((getCurrentHour ==  getToHour) && (getCurrentMinutes <= getToMinutes)) ){
                  		currentTimeInsideInterval = true;}
                  	else{
                  		currentTimeInsideInterval = false;}
                  	
         } else if (getFromHour > getToHour){
                  	if ((((getCurrentHour > getFromHour) && (getCurrentHour < 24)) || ((getCurrentHour >= 0) && (getCurrentHour < getToHour))) ||
                  	((getCurrentHour == getFromHour) && (getCurrentMinutes >= getFromMinutes)) ||
                  	((getCurrentHour ==  getToHour) && (getCurrentMinutes <= getToMinutes)) ){
                  		currentTimeInsideInterval = true;}
                  	else{
                  		currentTimeInsideInterval = false;}
                  	
                  } else {// (getFromHour == getToHour)
                  	if((getCurrentHour == getFromHour) && (getCurrentMinutes >= getFromMinutes) && (getCurrentMinutes <= getToMinutes)){
                  		currentTimeInsideInterval = true;}
                  	else{
                  		currentTimeInsideInterval = false;}
                  }
                  return currentTimeInsideInterval;
        // var flagHours = false;
        // var flagMinutes = true;
        // if (getCurrentHour >= getFromHour && getCurrentHour <= getToHour){
        //     flagHours = true;
        // }
        // if (flagHours){
        //     if (getCurrentHour == getFromHour || getCurrentHour ==  getToHour){
        //         if (getCurrentMinutes >= getFromMinutes){
        //             flagMinutes = true;
        //         } else {
        //             flagMinutes = false;
        //         }
        //         if (getCurrentMinutes <= getToMinutes){
        //             flagMinutes = true;
        //         } else {
        //             flagMinutes= false;
        //         }

        //     }
        // }
        // return flagMinutes&&flagHours;
    }
    
export default timeCompare;