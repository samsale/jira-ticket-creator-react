import React from 'react'
import { Image } from 'react-bulma-components';
import logo from '../config/logo.png'

class Header extends React.Component {
  render () {
    console.log(process.env.REACT_APP_LOGO);
    return (
    <div className="has-text-right">
    <Image className="is-inline-block" style={{ width: 120 }} src={logo}  />
    </div>
    )
  }
}

export default Header;
