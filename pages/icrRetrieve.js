
    var icr = []; 
    const icrRetrieve = function() {
      console.log('in icr');
        try {
            db.transaction( (tx) => {
                tx.executeSql(
                    'SELECT icrID, UserID, fromTime, toTime, ICR FROM icrInterval',
                  [],
                  (tx, results) => {
                    var rows = results.rows;
                    for (let i = 0; i < rows.length; i++){
                        var UID = rows.item(i).UserID;
                        if (UID == '54'){
                            icr.push({
                            id : rows.item(i).icrID,
                            from: rows.item(i).fromTime,
                            to : rows.item(i).toTime,
                            ICR: rows.item(i).ICR
                        });
                        
                        
                    }
                    console.log('ICR '+icr[i].id+' pos '+ i);
                  }
                  },
                );
              });
            } catch (error) {
              console.log(error);
            }
       return icr;
   }
   
export default icrRetrieve;