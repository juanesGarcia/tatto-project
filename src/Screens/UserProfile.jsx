import React from 'react';
import { useParams } from 'react-router-dom';

export const UserProfile = () => {
  const { value } = useParams();

  return (
    <div>
      <h1>User Profile</h1>
      <h1>Value: {value}</h1>
    </div>
  );
};
