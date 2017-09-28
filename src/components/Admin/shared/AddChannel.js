import React from 'react';
import { gql, graphql } from 'react-apollo';

import { channelsListQuery } from './ChannelsListWithData';

const AddChannel = ({ mutate }) => {
  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      evt.persist();
      mutate({
        variables: { siteName: evt.target.value, command: 'ADD' },
        refetchQueries: [{ query: channelsListQuery }],
      }).then((res) => {
        evt.target.value = '';
      });
    }
  };

  return <input type="text" placeholder="New channel" onKeyUp={handleKeyUp} />;
};

const addChannelMutation = gql`
  mutation addSite($siteName: String!) {
    addSite(siteName: $siteName) {
      id
      name
    }
  }
`;

const AddChannelWithMutation = graphql(addChannelMutation)(AddChannel);

export default AddChannelWithMutation;
