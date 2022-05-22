/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable radix */
/* eslint-disable eqeqeq */

import moment from 'moment';

     const timeCompare = function(from, to) {
         // from ex: 8:00 am, to ex: 12:00 pm
         var currentTimeInsideInterval = false;
        //====== parsing FROM ========//
        var fullFrom = from.split(' ');
        var getFromTime = fullFrom[0].split(':');
        var getFromHour = parseInt(getFromTime[0]);
        var getFromMinutes = parseInt(getFromTime[1]);
        var FromPeriod = fullFrom[1];
        if (getFromHour < 12 && (FromPeriod == 'pm' || FromPeriod == 'PM' )){
            getFromHour = getFromHour + 12;
        }
        //====== parsing TO ========//
        var fullTo = to.split(' ');
        var getToTime = fullTo[0].split(':');
        var getToHour = parseInt(getToTime[0]);
        var getToMinutes = parseInt(getToTime[1]);
        var ToPeriod = fullTo[1];
        if (getToHour < 12 && (ToPeriod == 'pm' || ToPeriod == 'PM' )){
            getToHour = getToHour + 12;
        }
        //==== parsing current Time ===//
        var currentDate = new Date();
        var currenTime = moment(currentDate).format('h:mm a');
        var fullCurrent = currenTime.split(' ');
        var getCurrentTime = fullCurrent[0].split(':');
        var getCurrentHour = parseInt(getCurrentTime[0]);
        var getCurrentMinutes = parseInt(getCurrentTime[1]);
        var CurrentPeriod = fullCurrent[1];
        if (getCurrentHour < 12 && (CurrentPeriod == 'pm' || CurrentPeriod == 'PM' )){
            getCurrentHour = getCurrentHour + 12;
        }
        // ====== comparing =======//
                 if (getFromHour < getToHour){
                  	if (((getCurrentHour > getFromHour) && (getCurrentHour < getToHour)) ||
                  	((getCurrentHour == getFromHour) && (getCurrentMinutes >= getFromMinutes)) ||
                  	((getCurrentHour ==  getToHour) && (getCurrentMinutes <= getToMinutes)) ){
                  		currentTimeInsideInterval = true;
                    }
                  	else {
                  		currentTimeInsideInterval = false;
                    }
                } else if (getFromHour > getToHour){
                  	if ((((getCurrentHour > getFromHour) && (getCurrentHour < 24)) || ((getCurrentHour >= 0) && (getCurrentHour < getToHour))) ||
                  	((getCurrentHour == getFromHour) && (getCurrentMinutes >= getFromMinutes)) ||
                  	((getCurrentHour ==  getToHour) && (getCurrentMinutes <= getToMinutes)) ){
                  		currentTimeInsideInterval = true;
                    }
                  	else {
                  		currentTimeInsideInterval = false;
                    }

                } else {// (getFromHour == getToHour)
                  	if ((getCurrentHour == getFromHour) && (getCurrentMinutes >= getFromMinutes) && (getCurrentMinutes <= getToMinutes)){
                  		currentTimeInsideInterval = true;
                    }
                  	else {
                  		currentTimeInsideInterval = false;
                    }
                }
                    return currentTimeInsideInterval;
    }

export default timeCompare;
