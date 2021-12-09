
    var isf = []; 
    const isfRetrieve = function() {
      console.log('in isf');
        try {
            db.transaction( (tx) => {
                tx.executeSql(
                    'SELECT isfID, UserID, fromTime, toTime, ISF, targetBG_correct, startBG_correct FROM isfInterval',
                  [],
                  (tx, results) => {
                    var rows = results.rows;
                    for (let i = 0; i < rows.length; i++){
                        var UID = rows.item(i).UserID;
                        if (UID == '160'){
                            isf.push({
                            id : rows.item(i).isfID,
                            from: rows.item(i).fromTime,
                            to : rows.item(i).toTime,
                            ISF: rows.item(i).ISF,
                            tBG: rows.item(i).targetBG_correct,
                            sBG: rows.item(i).startBG_correct,
                        });
                        console.log('ISF '+isf[i].id);
                    }
                  }
                  },
                );
              });
            } catch (error) {
              console.log(error);
            }
       return isf;
   }
   
export default isfRetrieve;