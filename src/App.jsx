import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

const gameIcons = [
  "❤️",
  "😊",
  "😁",
  "👍",
  "🤐",
  "😡",
  "🤢",
  "🤡",
  "🦁",
  "🐶",
  "👻",
  "🦢",
];

function App() {
  const [pices, setpices] = useImmer([]);

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    handleGameStart();
  }, [pices]);

  const startGame = () => {
    const duplicateGameIcons = [...gameIcons, ...gameIcons];
    const newGameIcons = [];

    for (let index = 0; index < gameIcons?.length * 2; index++) {
      const randomIndex = Math.floor(Math.random() * duplicateGameIcons.length);
      newGameIcons.push({
        emoji: duplicateGameIcons[randomIndex],
        flipped: false,
        solved: false,
        position: index,
      });
      duplicateGameIcons.splice(randomIndex, 1);
    }
    setpices((draft) => {
      draft = newGameIcons;
      return draft;
    });
  };

  const handleIsFliped = (position) => {
    setpices((draft) => {
      draft.forEach((pices) => {
        if (pices?.position === position) {
          pices.flipped = true;
        }
      });
    });
  };

  const handleGameStart = () => {
    const filteredGameCards = pices?.filter((pices) => {
      return pices?.flipped && !pices.solved;
    });
    if (filteredGameCards?.length === 2) {
      if (filteredGameCards[0]?.emoji === filteredGameCards[1]?.emoji) {
        setTimeout(() => {
          setpices((draft) => {
            draft?.forEach((pices) => {
              if (
                pices?.position === filteredGameCards[0]?.position ||
                pices?.position === filteredGameCards[1]?.position
              ) {
                pices.solved = true;
              }
            });
          });
        }, 800);
      } else {
        setTimeout(() => {
          setpices((draft) => {
            draft?.forEach((pices) => {
              if (
                pices?.position === filteredGameCards[0]?.position ||
                pices?.position === filteredGameCards[1]?.position
              ) {
                pices.flipped = false;
              }
            });
          });
        }, 800);
      }
    }
  };

  return (
    <main>
      <h1>Memmory Game in React</h1>
      <div className="container">
        {pices?.map((data, index) => (
          <div
            className={`flip-card ${data?.flipped ? "actives" : ""}`}
            key={index}
            onClick={() => handleIsFliped(data?.position)}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front"></div>
              <div className="flip-card-back">{data?.emoji}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
