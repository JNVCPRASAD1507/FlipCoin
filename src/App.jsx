import React, { useState } from 'react';
import { Button, Typography, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import ThumbDownAltRoundedIcon from '@mui/icons-material/ThumbDownAltRounded';

// Styled Coin component with increased size and proper mobile responsiveness
const Coin = styled(Card)(({ theme }) => ({
  width: 300, // Increased for laptop view
  height: 300,
  margin: '20px auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '2rem',
  transition: 'transform 0.25s linear, background-color 0.6s',
  borderRadius: '50%',
  boxShadow: '0 6px 15px rgba(0,0,0,0.4)',

  // Responsive for smaller devices
  [theme.breakpoints.down('sm')]: {
    width: 200,  // Bigger than before for mobile
    height: 200,
    fontSize: '1.5rem',
  },
}));


function App() {
  const [face, setFace] = useState('');
  const [flipping, setFlipping] = useState(false);
  const [rotation, setRotation] = useState(0);

  const flipCoin = () => {
    setFlipping(true);
    setFace(''); // Hide face while spinning

    let spinCount = 0;
    const totalSpins = 3 * 4;
    const spinInterval = setInterval(() => {
      setRotation(prev => prev + 360);
      spinCount++;
      if (spinCount >= totalSpins) {
        clearInterval(spinInterval);

        // Randomly decide face after spinning
        const random = Math.random();
        setFace(random < 0.5 ? 'Head' : 'Tail');
        setFlipping(false);
      }
    }, 250);
  };

  const getBackgroundColor = () => {
    if (face === 'Head') {
      return 'black';
    } else if (face === 'Tail') {
      return 'black';
    } else {
      return 'black';
    }
  };

  const renderFaceIcon = () => {
    if (face === 'Head') {
      return <ThumbUpAltRoundedIcon style={{ fontSize: '6rem', color: 'white' }} />; // Bigger thumb icon
    } else if (face === 'Tail') {
      return <ThumbDownAltRoundedIcon style={{ fontSize: '6rem', color: 'white' }} />; // Bigger thumb icon
    } else {
      return <Typography variant="h6"></Typography>;
    }
  };


  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#4e9fe2',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        padding: '10px',
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        style={{
          fontSize: '2.5rem',
          textAlign: 'center',
        }}
      >
        Click to Flip
      </Typography>

      {face && (
        <Typography
          variant="h4"
          style={{
            marginTop: '20px',
            marginBottom: '20px',
            fontSize: '2rem',
            textAlign: 'center',
          }}
        >
          {face}
        </Typography>
      )}

      <Coin
        style={{
          transform: `rotateY(${rotation}deg)`,
          backgroundColor: getBackgroundColor(),
        }}
      >
        <CardContent style={{ padding: '8px' }}>
          {renderFaceIcon()}
        </CardContent>
      </Coin>

      <Button
        variant="contained"
        onClick={flipCoin}
        style={{
          backgroundColor: 'black',
          color: 'white',
          marginTop: '20px',
          fontSize: '1.2rem',
          padding: '12px 24px',
        }}
        disabled={flipping}
      >
        Toss
      </Button>

    </div>
  );
}

export default App;
