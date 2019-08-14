import React from 'react';
import MediaQuery from 'react-responsive';
 
const Example = () => (
  <div>
    <div>Device Test!</div>
    <MediaQuery orientation="portrait">
      {(matches) => {
        if (matches) {
          return <div>Media query matches!</div>;
        } else {
          return <div>Media query does not match!</div>;
        }
      }}
    </MediaQuery>
  </div>
);

export default Example;