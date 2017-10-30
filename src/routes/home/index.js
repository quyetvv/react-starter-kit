/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';

async function action({ fetch }) {
  const resp = await fetch('/graphql', {
    body: JSON.stringify({
      query: '{postList {title,state,author,content {brief}}}',
    }),
  });
  const { data } = await resp.json();
  if (!data || !data.postList) throw new Error('Failed to load the news feed.');
  return {
    chunks: ['home'],
    title: 'Printo',
    component: (
      <Layout>
        <Home postList={data.postList} />
      </Layout>
    ),
  };
}

export default action;
