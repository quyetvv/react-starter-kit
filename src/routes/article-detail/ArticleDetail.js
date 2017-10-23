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
import { FormattedRelative } from 'react-intl';
import {gql, graphql, compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import newsQuery from './news.graphql';
import s from './ArticleDetail.css';
import ChannelsListWithData from '../../components/Admin/shared/ChannelsListWithData';

export const newsDetailQuery = gql`
  query QuerySuperDot ($news_id: String!) {
    news_detail(news_id: $news_id) {
        title
        link
        pubDate
        content
    }
  }
`;


class ArticleDetail extends React.Component {    

    render() {
        const { data: { loading, error, news_detail },dataItem } = this.props;
        const newsItem = news_detail;
        return (
            <div className={s.root}>
                <div className={s.container}>
                    <h1>Article Detail: </h1>    
                    <h2> Params: {dataItem.id}</h2>                
                    {loading && newsItem
                        ? 'Loading...'
                        : (
                            <article key={newsItem.link} className={s.newsItem}>
                                <h1 className={s.newsTitle}>
                                    <a href={newsItem.link}>{newsItem.title}</a>
                                </h1>
                                <span className={s.publishedDate}>
                                    {/* <FormattedRelative value={newsItem.pubDate} /> */}
                                </span>
                                <div
                                    className={s.newsDesc}
                                    // eslint-disable-next-line react/no-danger
                                    dangerouslySetInnerHTML={{ __html: newsItem.content }}
                                />
                            </article>
                        )}
                </div>
            </div>
        );
    }
}



export default compose(withStyles(s), graphql(newsDetailQuery, {
  options: (ownProps) => ({
    variables: {
      news_id: ownProps.dataItem.id // ownProps are the props that are added from the parent component
    },
  })}))(ArticleDetail);
