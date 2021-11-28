
    var cho = []; 
     const carbRetrieve = function() { // assuming that the format is h:mm pm/am
        
        try {
            console.log('in try');
              db.transaction(  ( tx) => {
                tx.executeSql(
                  'SELECT foodID, foodEnglishName, foodArabicName, unit, gramsOfCHO FROM CHO',
                  [],
                  (tx, results) => {
                    var rows = results.rows;
                    for (let i = 0; i < rows.length; i++){
                            cho.push({
                                id: rows.item(i).foodID,
                                foodEnglishName: rows.item(i).foodEnglishName,
                                foodArabicName: rows.item(i).foodArabicName,
                                unit: rows.item(i).unit,
                                gramsOfCHO: rows.item(i).gramsOfCHO,
                            });
                            console.log(cho[i].id+' / '+cho[i].foodEnglishName+' / '+cho[i].foodArabicName+' / '+cho[i].unit +' / '+cho[i].gramsOfCHO);
                
                      }
                  }   
        ) 
            
        
        }  ) 
        } catch (error) {
           console.log(error);
        }
        return cho;
    }
    
export default carbRetrieve;