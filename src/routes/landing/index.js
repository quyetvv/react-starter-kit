/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import DynamicLayoutPage from './DynamicLayoutPage';
import Layout from '../../components/Layout';

async function action({ fetch }) {
  // const resp = await fetch('/graphql', {
  //   body: JSON.stringify({
  //     query: '{ news {title,link,content}}',
  //   }),
  // });
  // const { data } = await resp.json();
  // if (!data || !data.news) throw new Error('Failed to load the news feed.');
   const type = 'DynamicLayoutPage';
  return {
    chunks: ['landing'],
    title: 'Landing page',
    component: (
      <Layout>
        <DynamicLayoutPage pageType={type}/>
      </Layout>
    ),
  };
}

export default action;
