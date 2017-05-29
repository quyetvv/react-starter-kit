/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PersonList.css';
import MenuItem from '../MenuItem';
import { createStore } from 'redux';


class PersonList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {   
    var thisCpn = this; 
     const res = await fetch('https://reqres.in/api/users?page=2')
  const r = await res.json()
  this.setState({pageMenus: r.data})
    //dispatchEvent('LOAD_MENUS');
    // fetch('https://reqres.in/api/users?page=2').then(data =>{
    //   return data.json();            
    // }).then(r => {
    //   thisCpn.setState({
    //     pageMenus: r.data
    //   });
    // });
  }

  render() {
    return (
      <div className={s.root} role="PersonList">
        {
          (this.state.pageMenus) &&
          (
            <ul>
              {
                this.state.pageMenus.map(item =>
                  <p>{item.first_name}</p>
                )
              }
            </ul>
          )
        }
      </div>
    );
  }
}

export default withStyles(s)(PersonList);
