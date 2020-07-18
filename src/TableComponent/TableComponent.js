import React,{useEffect,useState} from 'react';
import './TableComponent.css';
import axios from 'axios';
import {filterTable}   from '../Functions/FilterLogic';
import {MainFilterTable}   from '../Functions/FilterLogic';

const filerUserColInput={}         // Data  Entered in Coloumn Filter 
let filerUserGenInput=""           // Data  Entered in Generic Filter
let ColoumnFilterAvail = false;    // Boolean to see if coloumn filter is used or not

function TableComponent() {
  const [purchaseData , setPurchaseData] = useState([]); // Data From API
  const [filterData , setFilterData] = useState([]);     // Data After Filtering - Feed to Table   
  const [sortDet,setSortDet] = useState({});             // Sort Details
  const [tableHeader,setTableHeader] = useState([]);     // Table Header   

  const sortedItems = React.useMemo(() => {
      let sortedProducts = filterData;
      sortedProducts.sort((a, b) => {
      if (a[sortDet.key] < b[sortDet.key]) return sortDet.direction === 'asc' ? -1 : 1;
      if (a[sortDet.key] > b[sortDet.key]) return sortDet.direction === 'asc' ? 1 : -1;
      return 0;
      });
      setPurchaseData(sortedProducts);
    },[sortDet])

  useEffect(()=>{
      axios.get("http://localhost:3000/tableData")
      .then(
      data => {
           setPurchaseData( data.data );
           setFilterData(data.data);
           Object.entries(data.data[0]).map((val)=> {setTableHeader( prev => [...prev , val[0]]); return null});
           Object.entries(data.data[0]).map((val)=>{filerUserColInput[val[0]]=""});
     }
     ).catch(error => console.log("Error",error.message)) // API Error
       
    },[])

  const sortTable = (Header) =>{
     let direc = 'asc';
     if(sortDet && sortDet.key === Header && sortDet.direction === 'asc') direc= 'desc'
     setSortDet({key : Header, direction : direc})
     }

   const tblContent = filterData.map(val=> (<tr> {tableHeader.map(head=> (<td>{val[head]}</td>))} </tr>))
   
   const tblHeaderTemplate = tableHeader.map(val=> (<th onClick={()=>sortTable(val)}>{val.toUpperCase()}</th>));
   
   const filterInputBox = tableHeader.map(val=> (<td><input type="text" onChange={(event)=>mainFilterFn("columnFilter",event.target.value,val)}/></td>));     
   /* 
   Below Function Helps in whole Filtering Logic;
     1. Here we have Two Filter one is Genric and Coloumn Filter
     2. So User can do anything like they may first go for Generic Filter or Coloumn Filter
     3. Logic Flow like this
        --> First we check if any data is available in Generic Filter Input Box, 
            If yes Filter and Store the value;
            If No  have the initial for next coloumn filter
        --> Second we check for coloumn filter
            if yes - data is present and also if generic filter also applies, then filter applied to the data we stored from generic filter else filter applied for API data
            If no - then if has generic filter applies that data will be given to table.
   
   */
   const mainFilterFn = (filterFrom,key,colName) =>{
    let AllFilterData = [...purchaseData];            
    if(filterFrom === "GenricFilter"){
        filerUserGenInput = key;
    }
    if(filterFrom === "GenricFilter" || filerUserGenInput.length !== 0){
        
        let sendFilterData = [...purchaseData]
        let GenricFilteData = MainFilterTable(sendFilterData,filerUserGenInput);
        AllFilterData=[...GenricFilteData]
    }
    if(filterFrom === "columnFilter"){
        filerUserColInput[colName] = key;
    }
    if(ColoumnFilterAvail){
        Object.entries(filerUserColInput).some((key)=>{
          if(filerUserColInput[key[0]] !== ""){
              ColoumnFilterAvail = true;
              return true
          }else{
            ColoumnFilterAvail = false;
          }
      })
    }
    if(filterFrom === "columnFilter" || ColoumnFilterAvail){
        let ColoumnFilteData=[];
        Object.entries(filerUserColInput).some((key)=>{
            if(filerUserColInput[key[0]] !== ""){
                ColoumnFilterAvail = true;
                return true
            }
        })
    if(ColoumnFilterAvail){
          let sendFilterData ;
          if(AllFilterData.length === 0 && filerUserGenInput.length === 0){
              sendFilterData = [...purchaseData]
    }else{
              sendFilterData =  [...AllFilterData];
        }
    Object.entries(filerUserColInput).map((key1,value)=>{
        if(key1[1] != ""){
            ColoumnFilteData = filterTable(key1,sendFilterData);
             sendFilterData = [...ColoumnFilteData]      
          }
                  
        })  
        AllFilterData = [...sendFilterData]
        }                    
    }
    setFilterData([...AllFilterData]);     
  }

  return (
    <div className="tblView1" >
    <h4>Table with sorting , filtering and search</h4>
    <div style={{display: "flex","flex-direction": "row-reverse",marginBottom:"10px"}}>
      <input type="text" placeholder="search here..." onChange={(event)=> mainFilterFn("GenricFilter",event.target.value,null)} />
    </div>
   <table className="classic-tbl">
     <thead>
       <tr>
         {tblHeaderTemplate.length !== 0 ? tblHeaderTemplate :""}
       </tr>
     </thead>
     <tbody>
       <tr>
         {filterInputBox.length !==0 ? filterInputBox : ""}
       </tr>
      {purchaseData.length !== 0 ? tblContent : ""}
     </tbody>
   </table>
 </div>
  )
}
export default TableComponent;