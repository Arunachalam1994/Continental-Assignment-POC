export  function filterTable(key1 ,filteredData){
    console.log("filterDataCheck9",filteredData);
    console.log("filterDataCheck9",key1);
    return filteredData.filter(val=> {
        if(((String(val[key1[0]])).includes(key1[1]))) return true;
        else return false;
      });
}
export  function MainFilterTable(filterValue,e){
    // console.log("filterDataCheck",filterValue);
    // console.log("filterDataCheck",e);
    return filterValue.filter(val=> {
        let match = false;
     
         Object.entries(val).some((key)=>{
     
           if(key[0] != "id"){
             if((String(key[1])).includes(e)){
               match = true;
               return true
             }
           }
         });
         if(match){
             return val;
         }
       });
}