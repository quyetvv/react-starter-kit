/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import {
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import me from './queries/me';
import news from './queries/news';
import news_detail from './queries/news_detail';
import intl from './queries/intl';
import adminsites from './queries/adminsite';
import addSite from './queries/addsite';

const schema = new Schema({
  query: new ObjectType({
    name: 'QuerySuperDot',
    fields: {
      me,
      news,
      intl,
      adminsites,
      news_detail
    },
  }),
  mutation: new ObjectType({
    name: 'Mutations',
    fields: {
      addSite,
    },
  }),
});
export default schema;
