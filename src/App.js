import React,{useEffect,useState} from 'react';
import './App.css';
import axios from 'axios';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css'

function App() {

  const [purchaseData , setPurchaseData] = useState([]);
  const [purchaseData1 , setPurchaseData1] = useState([]);
  const [page , setPage] = useState(1);

   useEffect(()=>{
     axios.get("http://localhost:3000/tableData")
    .then(
      data => {
          setPurchaseData( (prev)=>{return [prev,...data.data]} );
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
  // const [scrollTop,clientHeight,scrollHeight] = event.currentTarget;
  // console.log(scrollTop);
  // console.log(clientHeight);
  // console.log(scrollHeight);
  if(event.currentTarget.scrollHeight - event.currentTarget.scrollTop === event.currentTarget.clientHeight){
    console.log("bottom")
    setPage(prev=> prev + 1 );
  }
}
  return (
    
    <div className="App">
      <div className="nav">
        <div><img src={require("./assests/conti-img.jpg")}></img></div>
      </div>
      <div style={{"margin-top" : "5%"}}>
        <div className="tblView">
      <ReactTable
        data={purchaseData}
        columns={col}
        filterable
        defaultPageSize={5}
        defaultFilterMethod={
          filterCaseSentitive
        }
      />
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
