import React from 'react';
import ReLine from './charts/Line';
import ReBar from './charts/Bar';
import RePie from './charts/Pie';

export default function App() {
  return (
    <div className="app">
      <ul>
        <li>
          <ReLine />
        </li>
        <li>
          <ReBar />
        </li>
        <li>
          <RePie />
        </li>
      </ul>
    </div>
  );
}
