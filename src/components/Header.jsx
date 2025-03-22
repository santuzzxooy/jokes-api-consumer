import "./Styles.css";
import joker from "../assets/joker.png"
import { useState } from "react";

const Header = () => {

    const [stars, setStars] = useState([]);

    const createStars = () => {
      const newStars = Array.from({ length: 5 }).map(() => ({ // Genera 10 estrellas
        id: Date.now() + Math.random(), // ID único
        left: Math.random() * window.innerWidth, // Posición aleatoria en el ancho
        delay: Math.random() * 0.5, // Retraso aleatorio para hacerlas más naturales
      }));
  
      setStars((prevStars) => [...prevStars, ...newStars]);
  
      // Elimina las estrellas después de 3 segundos
      setTimeout(() => {
        setStars((prevStars) =>
          prevStars.filter((star) => !newStars.includes(star))
        );
      }, 3000);
    };
  

    return (
        <>
            <header className="header">
                <div className="logo-container" onClick={createStars}>
                    <img src={joker} alt="Logo" className="logo" />
                </div>
                <span className="header-text">Jokes API Consumer</span>
            </header>

            <div className="stars-container">
                {stars.map((star) => (
                    <div
                        key={star.id}
                        className="star"
                        style={{ left: `${star.left}px` }}
                    />
                ))}
            </div>
        </>
    );
};

export default Header;