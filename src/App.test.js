import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Adapter from 'enzyme-adapter-react-16';
import {mount,configure,shallow} from 'enzyme'
import  Nav from "./NavBarComponent/NavBarComponent"
import  MainTable from "./TableComponent/TableComponent"
import  InfiniteScrolling from "./InfiniteScrollComponent/InfiniteScrollComponent"

configure({ adapter : new Adapter})

describe('Testing App Component',()=>{
  const wrapper = shallow(<App/>);

  it('Testing if Nav Component is rendered',()=>{
    expect(wrapper.find(Nav)).toHaveLength(1);
  })
  it('Testing if MainTable Component is rendered',()=>{
    expect(wrapper.find(MainTable)).toHaveLength(1);
  })
  it('Testing if InfiniteScrolling Component is rendered',()=>{
    expect(wrapper.find(InfiniteScrolling)).toHaveLength(1);
  })
})
