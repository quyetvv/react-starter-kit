/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { GraphQLList as List, GraphQLString as StringType } from 'graphql';
import AdminSiteType from '../types/AdminSiteType';
import AdminSite from '../models/AdminSite';

const items = [];

const siteInfo = {
  type: AdminSiteType,
  args: {
    domain: { type: StringType },
  },
  resolve: (value, { domain }) => AdminSite.create({ name: domain }),
};

export default siteInfo;
