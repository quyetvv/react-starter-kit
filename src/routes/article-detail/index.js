/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import ArticleDetail from './ArticleDetail';
import Layout from '../../components/Layout';

async function action({ fetch,params }) {
    const resp = await fetch('/graphql', {
        body: JSON.stringify({
            query: '{news{title,link,content}}',
        }),
    });
    const { data } = await resp.json();    
    if (!data || !data.news) throw new Error('Failed to load the news feed.');
    data.id = params.id;
    return {
        chunks: ['article-detail'],
        title: params.id,
        component: (
            <Layout>                
                <ArticleDetail dataItem={data} />
            </Layout>
        ),
    };
}

export default action;