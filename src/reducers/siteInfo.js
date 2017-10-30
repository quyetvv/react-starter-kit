import {
  GET_SITEINFO_START,
  GET_SITEINFO_SUCCESS,
  GET_SITEINFO_ERROR,
} from '../constants';

export default function siteInfo(state = null, action) {
  if (state === null) {
    return {      
    };
  }

  switch (action.type) {    
    case GET_SITEINFO_SUCCESS: {
      return action.payload.siteInfo;      
    }
    default: {
      return state;
    }
  }
}
