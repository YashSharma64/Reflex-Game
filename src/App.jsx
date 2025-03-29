"use client"
import { useState } from "react"
import "./App.css"

export default function ReflexGame() {
  const colors = ["red", "blue", "green", "yellow","black"]
  const [currentColor, setCurrentColor] = useState("")
  const [score, setScore] = useState(0)
  const [gameActive, setGameActive] = useState(false)
  const [startTime, setStartTime] = useState(0)
  const [reactionTime, setReactionTime] = useState(0)
  const [bestTime, setBestTime] = useState(null)

  const startGame = () => {
    setGameActive(true)
    setScore(0)
    setReactionTime(0)
    showNextColor()
  }

  const showNextColor = () => {
    setCurrentColor("")
    const delay = Math.floor(Math.random() * 2000) + 1000
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * colors.length)
      setCurrentColor(colors[randomIndex])
      setStartTime(Date.now())
    }, delay)
  }

  const handleColorClick = (selectedColor) => {
    if (!gameActive || !currentColor) return
    const endTime = Date.now()
    const timeTaken = endTime - startTime
    setReactionTime(timeTaken)

    if (selectedColor === currentColor) {
      setScore(score + 1)
      if (bestTime === null || timeTaken < bestTime) {
        setBestTime(timeTaken)
      }
      if (score < 4) {
        showNextColor()
      } else {
        setGameActive(false)
      }
    } else {
      setGameActive(false)
    }
  }

  return (
    <div className="container">
      <h1>Reflex Test Game</h1>
      <div className="cont"><p>Click the <span>Button</span> that matches the displayed color as quickly as possible!</p>
      <p>Score: {score}/5</p>
      {reactionTime > 0 && <p>Reaction time: {reactionTime} ms</p>}
      {bestTime !== null && <p>Best time: {bestTime} ms</p>}
      </div>

      {!gameActive ? (
        <button className="button" onClick={startGame}>
          {score > 0 ? "Play Again" : "Start Game"}
        </button>
      ) : (
        <div
          className="game-box"
          style={{ backgroundColor: currentColor || "transparent", opacity: currentColor ? 1 : 0 }}
        >
          {currentColor && currentColor.toUpperCase()}
        </div>
      )}

      <div className="color-buttons">
        {colors.map((color) => (
          <button
            key={color}
            className={`color-button ${color}`}
            onClick={() => handleColorClick(color)}
            disabled={!gameActive}
          >
          
          </button>
        ))}
      </div>
    </div>
  )
}
