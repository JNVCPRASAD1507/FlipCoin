import React, { useState } from 'react';
import { Button, Typography, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import ThumbDownAltRoundedIcon from '@mui/icons-material/ThumbDownAltRounded';

// Styled Coin component with improved realism and accessibility
const Coin = styled(Card)(({ theme }) => ({
  width: 260,
  height: 260,
  margin: '24px auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '2rem',
  transition: 'transform 0.5s cubic-bezier(.68,-0.55,.27,1.55), box-shadow 0.4s',
  borderRadius: '50%',
  boxShadow: '0 10px 30px 0 rgba(0,0,0,0.45), 0 1.5px 0 0 #fff inset',
  background: 'radial-gradient(circle at 60% 40%, #f7e7ce 70%, #bfa76a 100%)',
  border: '6px solid #bfa76a',
  position: 'relative',
  outline: 'none',
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    width: 140,
    height: 140,
    fontSize: '1rem',
  },
  '@media (max-width: 400px)': {
    width: 110,
    height: 110,
    fontSize: '0.8rem',
  },
}));



function App() {
  const [face, setFace] = useState('');
  const [flipping, setFlipping] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [score, setScore] = useState({ Head: 0, Tail: 0 });
  const [winner, setWinner] = useState('');

  const flipCoin = () => {
    if (winner) return; // Prevent flipping after win
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
        const result = random < 0.5 ? 'Head' : 'Tail';
        setFace(result);
        setFlipping(false);

        setScore(prev => {
          const updated = { ...prev, [result]: prev[result] + 1 };
          // Check for winner
          if (updated[result] >= 2) {
            setWinner(result);
          }
          return updated;
        });
      }
    }, 250);
  };

  const resetGame = () => {
    setScore({ Head: 0, Tail: 0 });
    setWinner('');
    setFace('');
    setRotation(0);
  };


  // For realism, background is handled in Coin styled component
  const getCoinLabel = () => {
    if (face === 'Head') return 'Heads';
    if (face === 'Tail') return 'Tails';
    return '';
  };

  const getWinnerLabel = () => {
    if (winner === 'Head') return 'Heads Win!';
    if (winner === 'Tail') return 'Tails Win!';
    return '';
  };


  // Realistic coin face rendering with ARIA label
  const renderFaceIcon = () => {
    if (face === 'Head') {
      return (
        <span aria-label="Heads" role="img" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ThumbUpAltRoundedIcon style={{ fontSize: '5.5rem', color: '#fffde4', filter: 'drop-shadow(0 2px 4px #bfa76a)' }} />
          <Typography variant="h6" style={{ color: '#bfa76a', fontWeight: 700, marginTop: 8, letterSpacing: 2 }}>HEADS</Typography>
        </span>
      );
    } else if (face === 'Tail') {
      return (
        <span aria-label="Tails" role="img" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ThumbDownAltRoundedIcon style={{ fontSize: '5.5rem', color: '#fffde4', filter: 'drop-shadow(0 2px 4px #bfa76a)' }} />
          <Typography variant="h6" style={{ color: '#bfa76a', fontWeight: 700, marginTop: 8, letterSpacing: 2 }}>TAILS</Typography>
        </span>
      );
    } else {
      return <Typography variant="h6" aria-hidden="true"></Typography>;
    }
  };


  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        padding: '10px',
        width: '100vw',
        boxSizing: 'border-box',
      }}
      aria-label="Coin Toss Game"
    >
      <header style={{ width: '100%' }}>
        <Typography
          variant="h2"
          gutterBottom
          style={{
            fontSize: '2.1rem',
            textAlign: 'center',
            fontWeight: 700,
            letterSpacing: 1.5,
            color: '#222',
            textShadow: '0 2px 8px #f4e8c9ff',
            margin: 0,
          }}
          tabIndex={0}
        >
          Flip the Coin
        </Typography>
      </header>

      <section aria-live="polite" style={{ width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto' }}>
        {/* Scoreboard */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2.5rem',
          marginBottom: 10,
          marginTop: 8,
          width: '100%',
          maxWidth: 400,
        }} aria-label="Scoreboard" role="region">
          <div style={{ textAlign: 'center' }}>
            <Typography variant="subtitle1" style={{ color: '#222', fontWeight: 900, letterSpacing: 1 }}>Heads</Typography>
            <Typography variant="h5" style={{ color: '#000000ff', fontWeight: 500 }}>{score.Head}</Typography>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Typography variant="subtitle1" style={{ color: '#222', fontWeight: 900, letterSpacing: 1 }}>Tails</Typography>
            <Typography variant="h5" style={{ color: '#000000ff', fontWeight: 500 }}>{score.Tail}</Typography>
          </div>
        </div>

        {/* Winner message */}
        {winner && (
          <Typography
            variant="h4"
            style={{
              marginTop: '10px',
              marginBottom: '10px',
              fontSize: '1.5rem',
              textAlign: 'center',
              color: '#d8d38aff',
              fontWeight: 700,
              letterSpacing: 1.2,
              textShadow: '0 1px 4px #fff',
            }}
            aria-live="assertive"
            aria-atomic="true"
            tabIndex={0}
          >
            {getWinnerLabel()}
          </Typography>
        )}

        {/* Coin face label (only if not winner) */}
        {!winner && face && (
          <Typography
            variant="h4"
            style={{
              marginTop: '10px',
              marginBottom: '10px',
              fontSize: '1.2rem',
              textAlign: 'center',
              color: '#000000ff',
              fontWeight: 600,
              letterSpacing: 1.2,
              textShadow: '0 1px 4px #fff',
            }}
            aria-live="polite"
            aria-atomic="true"
            tabIndex={0}
          >
            {getCoinLabel()}
          </Typography>
        )}

        <Coin
          style={{
            transform: `rotateY(${rotation}deg)`,
            outline: flipping ? '3px solid #58584bff' : 'none',
            boxShadow: flipping
              ? '0 0 0 6px #dacc88aa, 0 10px 30px 0 rgba(0,0,0,0.45)'
              : '0 10px 30px 0 rgba(0,0,0,0.45), 0 1.5px 0 0 #fff inset',
            filter: flipping ? 'brightness(1.1)' : 'none',
            cursor: winner ? 'not-allowed' : 'pointer',
            margin: '0 auto',
          }}
          tabIndex={0}
          aria-label={face ? `Coin showing ${getCoinLabel()}` : 'Coin'}
          role="img"
        >
          <CardContent style={{ padding: '8px', background: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            {renderFaceIcon()}
          </CardContent>
        </Coin>
      </section>

      <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
        <Button
          variant="contained"
          onClick={flipCoin}
          style={{
            backgroundColor: '#bfa76a',
            color: '#222',
            fontSize: '1.1rem',
            padding: '12px 24px',
            fontWeight: 700,
            borderRadius: '2rem',
            boxShadow: '0 2px 8px #efddae55',
            outline: 'none',
            minWidth: 110,
          }}
          disabled={flipping || !!winner}
          aria-label="Toss the coin"
          tabIndex={0}
        >
          Toss
        </Button>
        <Button
          variant="outlined"
          onClick={resetGame}
          style={{
            borderColor: '#bfa76a',
            color: '#bfa76a',
            fontWeight: 700,
            fontSize: '1rem',
            borderRadius: '2rem',
            padding: '10px 20px',
            outline: 'none',
            minWidth: 110,
          }}
          aria-label="Reset game"
          tabIndex={0}
        >
          Reset
        </Button>
      </div>

    </main>
  );
}

export default App;
