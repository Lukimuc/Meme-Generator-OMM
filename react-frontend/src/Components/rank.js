import React from 'react';

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div>
        {`${name}, your current entry count is...`}
      </div>
      <div>
        {entries}
      </div>
    </div>
  );
}

export default Rank;