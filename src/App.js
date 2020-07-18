import React,{useEffect,useState} from 'react';
import './App.css';
import  Nav from "./NavBarComponent/NavBarComponent"
import  MainTable from "./TableComponent/TableComponent"
import  InfiniteScrolling from "./InfiniteScrollComponent/InfiniteScrollComponent"

function App() {
  return (
    <div className="App">
        <Nav />
        <MainTable />
        <InfiniteScrolling />
    </div>
  );
}

export default App;
