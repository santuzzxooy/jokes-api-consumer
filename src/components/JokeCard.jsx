import { useState } from "react";
import "./Styles.css";

const JokeCard = () => {
    const [jokeGroups, setJokeGroups] = useState([]);
  
    const fetchJoke = async (api) => {
      try {
        let joke = {};
        if (api === "dad") {
          const res = await fetch("https://icanhazdadjoke.com/", { headers: { Accept: "application/json" } });
          const data = await res.json();
          joke = { type: "Dad Joke", text: data.joke };
        } else if (api === "chuck") {
          const res = await fetch("https://api.chucknorris.io/jokes/random");
          const data = await res.json();
          joke = { type: "Chuck Norris", text: data.value };
        } else if (api === "random") {
          const res = await fetch("https://v2.jokeapi.dev/joke/Any?type=single");
          const data = await res.json();
          joke = { type: "Random Joke", text: data.joke };
        } else if (api === "all") {
          const [dadRes, chuckRes, randomRes] = await Promise.all([
            fetch("https://icanhazdadjoke.com/", { headers: { Accept: "application/json" } }),
            fetch("https://api.chucknorris.io/jokes/random"),
            fetch("https://v2.jokeapi.dev/joke/Any?type=single"),
          ]);
  
          const [dadData, chuckData, randomData] = await Promise.all([
            dadRes.json(),
            chuckRes.json(),
            randomRes.json(),
          ]);
  
          const newJokes = [
            { id: Date.now() + 1, type: "Dad Joke", text: dadData.joke },
            { id: Date.now() + 2, type: "Chuck Norris", text: chuckData.value },
            { id: Date.now() + 3, type: "Random Joke", text: randomData.joke },
          ];
  
          setJokeGroups((prevGroups) => [newJokes, ...prevGroups]);
          return;
        }
  
        joke.id = Date.now();
        setJokeGroups((prevGroups) => [[joke], ...prevGroups]);
      } catch (error) {
        console.error("Error fetching jokes:", error);
      }
    };
  
    const clearJokes = () => {
      setJokeGroups([]);
    };
  
    const deleteJoke = (jokeId) => {
      setJokeGroups((prevGroups) =>
        prevGroups.map((group) => group.filter((joke) => joke.id !== jokeId)).filter((group) => group.length > 0)
      );
    };
  
    return (
      <div className="joke-card">
        <div className="button-container">
          <button onClick={() => fetchJoke("all")} className="fetch-button">All</button>
          <button onClick={() => fetchJoke("dad")} className="api-button dad">Dad Joke</button>
          <button onClick={() => fetchJoke("chuck")} className="api-button chuck">Chuck Norris</button>
          <button onClick={() => fetchJoke("random")} className="api-button random">Random</button>
          <button onClick={clearJokes} className="clear-button">Delete Jokes</button>
        </div>
        <div className="joke-container">
          {jokeGroups.map((group, index) => (
            <div key={index} className="joke-row">
              {group.map((joke) => (
                <div key={joke.id} className="joke-box">
                  <button className="delete-button" onClick={() => deleteJoke(joke.id)}>✖</button>
                  <h3>{joke.type}</h3>
                  <p>{joke.text}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default JokeCard;