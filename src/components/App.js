import React, { useEffect, useRef, useState } from "react";

function App() {
  const [totalCentiseconds, setTotalCentiseconds] = useState(0);
  const [laps, setLaps]= useState([]);
  const intervalRef = useRef(null);

  const centiseconds = totalCentiseconds % 100;
  const seconds = Math.floor((totalCentiseconds / 100) % 60);
  const minutes = Math.floor((totalCentiseconds / 6000) % 60);
  const hours = Math.floor(totalCentiseconds / 360000);

  const formatTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  const handleStart = () => {
    if (intervalRef.current !== null) return;

    intervalRef.current = setInterval(() => {
      setTotalCentiseconds((prev) => prev + 1);
    }, 10);
  };


  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };


  const lap = () => {
    const filterdTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}:
        ${formatTime(centiseconds)}`;

        setLaps((prevLaps) => [...prevLaps ,filterdTime]);
  };
  

  const reset = () => {
    stop();
    setTotalCentiseconds(0);
    handleStart();
  };

  // useEffect for cleanup

  useEffect(()=> {
    return (()=> {
      clearInterval(intervalRef.current)
    });
  },[])

  return (
    <div>
      <p className="heading">Timer </p>
      <p>
        {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}:
        {formatTime(centiseconds)}
      </p>
      <div>
        <button onClick={handleStart}>start</button>
        <button onClick={stop}> Stop</button>
        <button onClick={lap}>Lap</button>
        <button onClick={reset}> Restart</button>
      </div>
      <div>
        <ul>
          {laps.map((time,index) => (
            <li key={index}>Lap {index + 1} : {time} </li>

          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
