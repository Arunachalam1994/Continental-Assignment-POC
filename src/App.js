import React,{useEffect,useState} from 'react';
import './App.css';
import axios from 'axios';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css'
const filerUserIp = {
  pDate : "",
  price : "",
  quantity : "",
  reqRaiseBy : "",
  reqDate : "",
  description : ""
  }
function App() {

  const [purchaseData , setPurchaseData] = useState([]);
  const [filterData , setFilterData] = useState([]);
  const [ColMainfilterData , setColMainFilterData] = useState([]);
  const [MainfilterData , setMainFilterData] = useState([]);
  const [mainEmpty , setmainEmpty] = useState(false);
  const [colEmpty , setcolEmpty] = useState(false);
  const [mainFilterValue , SetmainFilterValue] = useState("");
  const [sortDet,setSortDet] = useState({});
  const [purchaseData1 , setPurchaseData1] = useState([]);
  const [page , setPage] = useState(1);

  const sortedItems = React.useMemo(() => {
    let sortedProducts = filterData;
    sortedProducts.sort((a, b) => {
    if (a[sortDet.key] < b[sortDet.key]) {
      return sortDet.direction === 'asc' ? -1 : 1;
    }
    if (a[sortDet.key] > b[sortDet.key]) {
      return sortDet.direction === 'asc' ? 1 : -1;
    }
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
          console.log("testtest",data)
    }
    ).catch(error => console.log("Error",error.message)) // Here we can add overlay popup to show reason for error
    
  },[])

  useEffect(()=>{
    axios.get("http://localhost:3000/tableData?_page=" + page + "&_limit=5")
    .then(
      data => {
          setPurchaseData1( (prev)=>{return [...prev,...data.data]} );
          console.log("testtest",data)
    }
    ).catch(error => console.log("Error",error.message)) // Here we can add overlay popup to show reason for error
    
  },[page])
  
  const filterCaseSentitive = (filter,row) =>{
    
    const content = row[filter.id];
    return String(content).toLowerCase().includes(filter.value.toLowerCase())
  }
  const col =[
    {
       "Header":"Purchase Date",
       "accessor":"pDate"
    },
    {
       "Header":"Price",
       "accessor":"price"
    },
    {
       "Header":"Quantity",
       "accessor":"quantity"
    },
    {
       "Header":"Request Raise By",
       "accessor":"reqRaiseBy"
    },
    {
       "Header":"Requested Date",
       "accessor":"reqDate"
    },
    {
       "Header":"Description",
       "accessor":"description"
    }
 ]
 const handleScroll = (event)=>{
   console.log(event.currentTarget.clientHeight)
  if(event.currentTarget.scrollHeight - event.currentTarget.scrollTop === event.currentTarget.clientHeight){
    console.log("bottom")
    setPage(prev=> prev + 1 );
  }
}

const sortTable = (Header) =>{
 
  let direc = 'asc';
  if(sortDet && sortDet.key === Header && sortDet.direction === 'asc'){
    console.log("Asdasd","desc")
    direc= 'desc'
  }
  setSortDet({key : Header , direction : direc})
}

const tblContent = filterData.map((val)=>{
  console.log("test12",filterData)
  if(purchaseData.length != 0){
    return( 
      <tr>
        <td >{val.pDate}</td>
        <td>{val.price}</td>
        <td>{val.quantity}</td>
        <td>{val.reqRaiseBy}</td>
        <td>{val.reqDate}</td>
        <td>{val.description}</td>
      </tr>
    )
  } 
})
const filterHandler = (key,colName) =>{
  filerUserIp[colName] = key;
  let TempColEmpty = true;
  let filteredData;
  if(MainfilterData.length !=0){
    filteredData =  [...MainfilterData];
  }else{
    filteredData  = [...purchaseData];
  }   
  Object.entries(filerUserIp).map((key1,value)=>{
    if(key1[1] != ""){
      TempColEmpty = false;
      filteredData = filteredData.filter(val=> {
        if(((String(val[key1[0]])).includes(key1[1]))){
          return true;
        }else{
          return false;
        }
      });
    }
  })   

  if(TempColEmpty){
    setcolEmpty(true);
    console.log("going to new fn",mainFilterValue)
  }else{
    setcolEmpty(false)
  }
  if(TempColEmpty && mainEmpty){
    setFilterData([...purchaseData]);
    setColMainFilterData([]);
    setmainEmpty(false);
    setcolEmpty(false);

  }else{
       setFilterData([...filteredData]);
       setColMainFilterData([...filteredData]);
  }
  if(TempColEmpty && mainFilterValue != ""){
       setColMainFilterData([...purchaseData]);
       mainFilterFn(mainFilterValue,true);
  }  
}

const mainFilterFn =(e,fromChild) =>{
  SetmainFilterValue(e);
  let filterValue;
  let tempMainEmpty = false;
  if(e === ""){
    setmainEmpty(true);
    setMainFilterData([])
    tempMainEmpty = true
  }
  if(fromChild){
    filterValue = [...purchaseData]
  }
  else if(ColMainfilterData.length !=0 || filterData.length === 0){
    filterValue = [...ColMainfilterData]
  }else{
    filterValue = [...purchaseData]
  }
    console.log("main Filter", e);
    let input = String(e);
    let mFilter=[] ;
    let valueCheck=[] ;
  
  
    valueCheck= filterValue.filter(val=> {
      console.log("main filter", val);
     let match = false;
  
      Object.entries(val).some((key)=>{
        console.log("main filter test");
      console.log("main filter", key);
  
        if(key[0] != "id"){
          if((String(key[1])).includes(e)){
            match = true;
            return true
          }
        }
      });
      if(match){
          console.log("main filter matched reruen")
          return val;
      }
    });
    if(tempMainEmpty  && colEmpty){
        setFilterData([...purchaseData]);
        setMainFilterData([]);
        setmainEmpty(false);
        setcolEmpty(false);
    }else{
        setFilterData([...valueCheck]);
        if(e !=0)

      setMainFilterData([...valueCheck]);
    }
}

  return (
    <div className="App">
     
      <div className="nav">
        <div><img src={require("./assests/conti-img.jpg")}></img></div>
      </div>
      <div style={{"margin-top" : "5%"}}>
        <div className="tblView">
      {/* <ReactTable
        data={purchaseData}
        columns={col}
        filterable
        defaultPageSize={5}
        defaultFilterMethod={
          filterCaseSentitive
        }
      /> */}
      </div>
      <div className="tblView1" style={{"height" : "100vh", "marginTop": "50px"}}>
        <h4>Table with sorting , filtering and search</h4>
        <div style={{display: "flex","flex-direction": "row-reverse",marginBottom:"10px"}}>
          
          <input type="text" placeholder="search here..." onChange={(event)=> mainFilterFn(event.target.value,false)} />
        </div>
       <table className="classic-tbl">
         <thead>
           <tr>
             <th onClick={()=>sortTable("pDate")}>Purchase Date</th>
             <th onClick={()=>sortTable("price")}>Price</th>
             <th onClick={()=>sortTable("quantity")}>Quantity</th>
             <th onClick={()=>sortTable("reqRaiseBy")}>Request Raise By</th>
             <th onClick={()=>sortTable("reqDate")}>Requested Date</th>
             <th onClick={()=>sortTable("description")}>Description</th>
           </tr>
         </thead>
         <tbody>
           <tr>
             <td><input type="text" onChange={(event)=>filterHandler(event.target.value,"pDate")}/></td>
             <td><input type="text" onChange={(event)=>filterHandler(event.target.value,"price")}/></td>
             <td><input type="text" onChange={(event)=>filterHandler(event.target.value,"quantity")}/></td>
             <td><input type="text" onChange={(event)=>filterHandler(event.target.value,"reqRaiseBy")}/></td>
             <td><input type="text" onChange={(event)=>filterHandler(event.target.value,"reqDate")}/></td>
             <td><input type="text" onChange={(event)=>filterHandler(event.target.value,"description")}/></td>
           </tr>
          {purchaseData.length !== 0 ? tblContent : []}
         </tbody>
       </table>
     </div>
        <div className="mainScroll" >
        <h3>
          Infinite Scrolling
        </h3>
        <div className="tblView1" onScroll={handleScroll}>
      <ReactTable
        data={purchaseData1}
        className="tblScroll"
        columns={col}
        minRows={2}
        filterable
        defaultFilterMethod={
          filterCaseSentitive
        }
        showPagination={false}
      />
      </div>
        </div>
      </div>
      
     
    </div>
  );
}

export default App;
