import React from 'react';
import { gql, graphql } from 'react-apollo';

import AddChannel from './AddChannel';

const ChannelsList = ({ data: { loading, error, adminsites } }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="channelsList">
      <AddChannel />
      <div>{adminsites.length}</div>
      {adminsites.length > 0 &&
        adminsites.map(ch => (
          <div key={ch.id} className="channel">
            {ch.name}
          </div>
        ))}
    </div>
  );
};

export const channelsListQuery = gql`
  query QuerySuperDot {
    adminsites {
      id
      name
    }
  }
`;

export default graphql(channelsListQuery, {
  // options: { pollInterval: 5000 },
})(ChannelsList);
