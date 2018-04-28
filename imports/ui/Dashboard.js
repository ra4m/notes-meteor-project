import React from 'react';
import NoteList from './NoteList';
import PrivateHeader from './PrivateHeader.js';
import Editor from './Editor';

const Dashboard = () => {
  return (
    <div>
      <PrivateHeader title="Dashboard" />
      <div className="page-content">
        <NoteList />
        <Editor />
      </div>
    </div>
  );
};

export default Dashboard;
