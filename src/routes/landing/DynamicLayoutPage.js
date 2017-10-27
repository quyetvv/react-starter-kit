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
import { gql, graphql, compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './DynamicLayoutPage.css';
import ChannelsListWithData from '../../components/Admin/shared/ChannelsListWithData';
import AddChannel from '../../components/Admin/shared/AddChannel';

export const pageLayoutQuery = gql`
  query QuerySuperDot ($pageType: String!) {
    pageLayout(pageType: $pageType) {
        content
    }
  }
`;

const provideContext =
    (childContextTypes, getChildContext) => (Component) => {
        class ContextProvider extends React.Component {
            static childContextTypes = childContextTypes;
            getChildContext = () => getChildContext(this.props);

            render() {
                return <Component {...this.props} />;
            }
        }
        return ContextProvider;
    };

const consumeContext = (contextTypes) => (Component) => {
    /* The context is passed as props. This way the component is
     completely decoupled from the context API.
    */
    const ContextConsumer = (props, context) =>
        <Component {...props} {...context} />;
    ContextConsumer.contextTypes = contextTypes;
    return ContextConsumer;
};


export class PageBlock extends React.Component {
    getBlock(blockInfo) {
        switch (blockInfo.blockType) {
            case 'ChannelList':
                return <ChannelsListWithData />
                break;
            default:
                return <AddChannel />
                break;
        }
    }

    render() {
        const { blockInfo } = this.props;
        return (
            <div className='block'>
                {
                    this.getBlock(blockInfo)
                }
            </div>
        )
    }
}


export class PageRegionList extends React.Component {
    render() {
        const { regions } = this.props;
        return (
            <div className='region-list'>
                {
                    regions.length > 0 && regions.map(region => (
                        <div className='region' key={region.id}>
                            {
                                region.blocks.map(block => (
                                    <PageBlock key={block.id} blockInfo={block} />
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        )
    }
}

class DynamicLayoutPage extends React.Component {
    createComponent(componentName, props, children) {
        var component = React.createElement(eval(componentName), props, children);
        return component;
    }

    render() {
        const { data: { loading, error, pageLayout } } = this.props;
        // console.log(pageLayout.content)
        const layout = {
            regions: [
                {
                    type: 'Header',
                    css: 'customer-header',
                    blocks: [
                        {
                            blockType: 'ChannelList',
                            id: 1,
                            data: ''
                        },
                        {
                            blockType: 'LeftMenu',
                            id: 2,
                            data: ''
                        },
                        {
                            blockType: 'LanguageSwicher',
                            id: '3',
                            data: ''
                        }
                    ]
                }
            ]
        }
        // const layout = pageLayout.content
        return (
            <div className={s.root}>
                <div className={s.container}>
                    <h1>Dynamic Landing Page </h1>
                    {loading
                        ? 'Loading...'
                        : (
                            <div>
                                <div>{layout.regions.length}</div>
                                <PageRegionList regions={layout.regions} />
                            </div>
                        )}
                </div>
            </div>
        );
    }
}



export default compose(withStyles(s), graphql(pageLayoutQuery, {
    options: (ownProps) => ({
        variables: {
            pageType: ownProps.pageType // ownProps are the props that are added from the parent component
        },
    })
}))(DynamicLayoutPage);
