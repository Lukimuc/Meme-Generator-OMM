import React from 'react';

const Rank = ({ firstname, entries }) => {
  return (
    <div>
      <div>
        {`${firstname}, your current entry count is...`}
      </div>
      <div>
        {entries}
      </div>
    </div>
  );
}

export default Rank;