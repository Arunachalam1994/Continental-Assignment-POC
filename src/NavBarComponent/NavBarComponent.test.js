import React from 'react';
import { render } from '@testing-library/react';
import NavBarComponent from './NavBarComponent';
import Adapter from 'enzyme-adapter-react-16';
import {mount,configure,shallow} from 'enzyme'


configure({ adapter : new Adapter})

describe('Testing Nav Component',()=>{
  const wrapper = shallow(<NavBarComponent/>);

  it('Testing If Nav has class nav',()=>{
      expect(wrapper.find('div.nav').hasClass('nav')).toBeTruthy;
  })
  it('Testing If Img Tag is rendered once',()=>{
    expect(wrapper.find('img')).toHaveLength(1)
})
})
