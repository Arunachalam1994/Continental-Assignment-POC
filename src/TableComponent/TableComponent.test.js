import React from 'react';
import { render } from '@testing-library/react';
import TableComponent from './TableComponent';
import Adapter from 'enzyme-adapter-react-16';
import {mount,configure,shallow} from 'enzyme'


configure({ adapter : new Adapter})

describe('Testing Table Component',()=>{
 
  const wrapper = mount(<TableComponent/>);

  it('Testing If Table Component has Table tag inserted',()=>{
    expect(wrapper.find('table')).toHaveLength(1);
  })
  it('Testing Table Component have input text',()=>{
    expect(wrapper.find('input[type="text"]').length).toEqual(1);
  })  
})
