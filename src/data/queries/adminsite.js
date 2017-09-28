/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { GraphQLList as List } from 'graphql';
import AdminSiteType from '../types/AdminSiteType';
import AdminSite from '../models/AdminSite';

let items = [];

const adminsites = {
  type: new List(AdminSiteType),
  resolve() {
    return AdminSite.all().then(sites => {
      items = sites;
      return items;
    });
  },
};

export default adminsites;
