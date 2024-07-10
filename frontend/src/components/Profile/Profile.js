import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Container, Typography } from '@mui/material';

function Profile() {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const docRef = doc(db, 'users', currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    if (currentUser) {
      fetchUserData();
    }
  }, [currentUser]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Profile</Typography>
      {userData && (
        <>
          <Typography variant="body1"><strong>Username:</strong> {userData.username}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {currentUser.email}</Typography>
          <Typography variant="body1"><strong>Wallet Address:</strong> {userData.walletAddress}</Typography>
        </>
      )}
    </Container>
  );
}

export default Profile;
