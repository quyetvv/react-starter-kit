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

  componentDidMount() {   
    var thisCpn = this; 
    //dispatchEvent('LOAD_MENUS');
    fetch('https://reqres.in/api/users?page=2').then(data =>{
      return data.json();            
    }).then(r => {
      thisCpn.setState({
        pageMenus: r.data
      });
    });
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
                  <img src={item.avatar} />
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
