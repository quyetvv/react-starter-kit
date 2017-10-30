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
import { IntlProvider } from 'react-intl';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import Header from '../components/Header';
// import LeftDrawer from '../components/LeftDrawer';
import withWidth, { LARGE, SMALL } from 'material-ui/utils/withWidth';
import ThemeDefault from './Theme/theme-default';
import Avatar from 'material-ui/Avatar';

const ContextType = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: PropTypes.func.isRequired,
  // Universal HTTP client
  fetch: PropTypes.func.isRequired,
  // Integrate Redux
  // http://redux.js.org/docs/basics/UsageWithReact.html
  ...ReduxProvider.childContextTypes,
  // Apollo Client
  client: PropTypes.object.isRequired,
  // ReactIntl
  intl: IntlProvider.childContextTypes.intl,
  siteInfo: PropTypes.object.isRequired
};

/**
 * The top-level React component setting context (global) variables
 * that can be accessed from all the child components.
 *
 * https://facebook.github.io/react/docs/context.html
 *
 * Usage example:
 *
 *   const context = {
 *     history: createBrowserHistory(),
 *     store: createStore(),
 *   };
 *
 *   ReactDOM.render(
 *     <App context={context}>
 *       <Layout>
 *         <LandingPage />
 *       </Layout>
 *     </App>,
 *     container,
 *   );
 */
class App extends React.PureComponent {
  static propTypes = {
    context: PropTypes.shape(ContextType).isRequired,
    children: PropTypes.element.isRequired,
  };

  static childContextTypes = ContextType;

  getChildContext() {
    const { siteInfo } = this.props.context;
    //this.state = {siteInfo};
    if (siteInfo) {
      //siteInfo.id = 1;
    }

    return this.props.context;
  }

  // NOTE: This methods are not needed if you update URL by setLocale action.
  //
  //  componentDidMount() {
  //    const store = this.props.context && this.props.context.store;
  //    if (store) {
  //      this.lastLocale = store.getState().intl.locale;
  //      this.unsubscribe = store.subscribe(() => {
  //        const state = store.getState();
  //        const { newLocale, locale } = state.intl;
  //        if (!newLocale && this.lastLocale !== locale) {
  //          this.lastLocale = locale;
  //          this.forceUpdate();
  //        }
  //      });
  //    }
  //  }
  //
  //  componentWillUnmount() {
  //    if (this.unsubscribe) {
  //      this.unsubscribe();
  //      this.unsubscribe = null;
  //    }
  //  }

  render() {
    const style = { margin: 5 };
    // Here, we are at universe level, sure? ;-)
    const { client } = this.props.context;
    // NOTE: If you need to add or modify header, footer etc. of the app,
    // please do that inside the Layout component.
    return (
      <ApolloProvider client={client}>
        <MuiThemeProvider muiTheme={ThemeDefault}>
          {this.props.children}
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
