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
import s from './MenuBar.css';
import MenuItem from '../MenuItem';

class MenuBar extends React.Component {
  static propTypes = {
    pageMenus: PropTypes.array.isRequired,
  };

  render() {
    return (
      <div className={s.root} role="MenuBar">
        this.props.pageMenus.map(menuItem => 
          <MenuItem {...menuItem}/>
        );
      </div>
    );
  }
}

export default withStyles(s)(MenuBar);
