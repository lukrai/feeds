import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>
        4Scroll!
      </h1>
      Collect feeds

      <Link to={"/feeds"}>
        <h3 className="">FEEDS</h3>
      </Link>
    </div>
  );
};

export default Landing;
