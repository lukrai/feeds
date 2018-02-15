import React from 'react';
import { Link } from 'react-router-dom';
import FeedList from './feeds/FeedList';

const Dashboard = () =>{
    return (
        <div>
          <FeedList />
          <div className="fixed-action-btn">
            <Link to="/feeds/new" className="btn-floating btn-large red">
              <i className="material-icons">add</i>
            </Link>
          </div>
        </div>
      );
};

export default Dashboard;