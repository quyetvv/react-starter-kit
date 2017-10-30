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

class ArticleDetail extends React.Component {    

    render() {
        const { data: { loading, error, postDetail },slug } = this.props;        
        return (
            <div className={s.root}>
                <div className={s.container}>
                    <h1>Article Detail </h1>
                    {/* <h2> Params: {slug}</h2>                 */}
                    {loading && postDetail
                        ? 'Loading...'
                        : (
                            <article key={postDetail.link} className={s.postDetail}>
                                <h1 className={s.newsTitle}>
                                    <a href={postDetail.link}>{postDetail.title}</a>
                                </h1>
                                <span className={s.publishedDate}>
                                    {/* <FormattedRelative value={postDetail.pubDate} /> */}
                                </span>
                                <div
                                className={s.newsDesc}
                                // eslint-disable-next-line react/no-danger
                                dangerouslySetInnerHTML={{ __html: postDetail.content.brief }}
                              />
                              <div
                                className={s.newsDesc}
                                // eslint-disable-next-line react/no-danger
                                dangerouslySetInnerHTML={{ __html: postDetail.content.extended }}
                              />
                            </article>
                        )}
                </div>
            </div>
        );
    }
}



export default compose(withStyles(s), graphql(newsQuery, {
  options: (ownProps) => ({
    variables: {
        slug: ownProps.slug // ownProps are the props that are added from the parent component
    },
  })}))(ArticleDetail);
