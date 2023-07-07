import React from 'react';
import { useParams } from 'react-router-dom';

export const UserProfile = () => {
  const {id,name} = useParams();
  console.log(name)

  return (
    <div>
      <h1>User Profile</h1>
      <h1>Value: {name}
</h1>
<h2>id: {id}</h2>
    </div>
  );
};
