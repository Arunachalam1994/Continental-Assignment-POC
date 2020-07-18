import React,{useEffect,useState} from 'react';
import './InfiniteScrollComponent.css';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css'
import axios from 'axios';

function InfiniteScrollComponent (){
    const [purchaseData1 , setPurchaseData1] = useState([]);
    const [page , setPage] = useState(1);

    useEffect(()=>{
        axios.get("http://localhost:3000/tableData?_page=" + page + "&_limit=5")
        .then(
          data => { setPurchaseData1( (prev)=>{return [...prev,...data.data]} )}
        ).catch(error => console.log("Error",error.message)) // Here we can add overlay popup to show reason for error
      },[page])

      const filterCaseSentitive = (filter,row) =>{
        const content = row[filter.id];
        return String(content).toLowerCase().includes(filter.value.toLowerCase())
      }
      const colHeader =[
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
      if(event.currentTarget.scrollHeight - event.currentTarget.scrollTop === event.currentTarget.clientHeight) 
        setPage(prev=> prev + 1 )
    }
    
    
    return(
        <div className="mainScroll" > 
        <h3>
            Infinite Scrolling
        </h3>
        <div className="tblViewInfScroll" onScroll={handleScroll}>
            <ReactTable
            data={purchaseData1}
            className="tblScroll"
            columns={colHeader}
            minRows={2}
            filterable
            defaultFilterMethod={
            filterCaseSentitive
            }
            showPagination={false}
        />
        </div>
        </div>
    )
}


export default InfiniteScrollComponent;





      
     

