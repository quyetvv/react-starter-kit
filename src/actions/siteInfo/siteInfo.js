/* eslint-disable import/prefer-default-export */

import {
  GET_SITEINFO_START,
  GET_SITEINFO_SUCCESS,
  GET_SITEINFO_ERROR,
} from '../../constants';

import querySiteInfo from './siteInfo.graphql';

function getSiteInfoFromState(state,csiteInfo) {
  const siteInfo = (state && state.siteInfo) || csiteInfo; 
  return siteInfo;
}

export function getSiteInfo(siteInfo) {
  return (dispatch, getState) => getSiteInfoFromState(getState(),siteInfo);
}

export function setSiteInfo({ siteUrl }) {
  return async (dispatch, getState, { client, history }) => {
    dispatch({
      type: GET_SITEINFO_START,
      payload: {
        siteInfo: {domains: [siteUrl]},
      },
    });

    try {
      // WARNING !!
      // do not use client.networkInterface except you want skip Apollo store
      // use client.query if you want benefit from Apollo caching mechanisms
      const { data } = await client.query({
        query: querySiteInfo,
        variables: { domain: siteUrl },
      });
      const siteInfo = data.siteInfo;
      dispatch({
        type: GET_SITEINFO_SUCCESS,
        payload: {
          siteInfo
        },
      });

      // return bound SiteInfo instance at the end
      return getSiteInfoFromState(getState(),siteInfo);
    } catch (error) {
      dispatch({
        type: GET_SITEINFO_ERROR,
        payload: {
          siteUrl,
          error,
        },
      });
      return null;
    }
  };
}
