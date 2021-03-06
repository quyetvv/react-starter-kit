/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';
import MenuBar from '../MenuBar';
import logoUrl from './logo-small.png';
import logoUrl2x from './logo-small@2x.png';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pageMenus : [
      {id:'1', text:'about', to: '/about',children: null},
      {id:'2', text:'products', to: '/products',children: null},
      {id:'3', text:'articles', to: '/articles',children: null}
    ]};
  }
  // id: PropTypes.number.isRequired,    
  //   translateKey: ProTypes.string,
  //   text: PropTypes.string.isRequired,
  //   to: PropTypes.string.isRequired,
  //   children: PropTypes.node.isRequired,
  //   onClick: PropTypes.func,  
  componentDidMount() {   
    var thisCpn = this; 
    //dispatchEvent('LOAD_MENUS');
    fetch('https://reqres.in/api/users?page=2').then(data =>{
      return data.json();            
    }).then(r => {
      thisCpn.setState({
        pageMenus: r.data.map(item => {
          return {
           id : item.id,
           text: item.first_name,
           to: item.avatar
        }})
      });
    });
  }

  render() {
    // const pageMenus = [
    //   {id:'1', text:'about', to: '/about',children: null},
    //   {id:'2', text:'products', to: '/products',children: null},
    //   {id:'3', text:'articles', to: '/articles',children: null}
    // ];

    return (
      <div className={s.root}>
        <div className={s.container}>
          <Navigation/>
          <MenuBar pageMenus={this.state.pageMenus}/>
          <Link className={s.brand} to="/">
            <img src={logoUrl} srcSet={`${logoUrl2x} 2x`} width="38" height="38" alt="React" />
            <span className={s.brandTxt}>Your Company</span>
          </Link>
          <div className={s.banner}>
            <h1 className={s.bannerTitle}>newt</h1>
            <p className={s.bannerDesc}>Complex web apps made easy</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Header);
