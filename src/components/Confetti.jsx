import {useEffect, useState} from 'react';
import './Confetti.css';

const Confetti = ({onComplete}) => {
    const [pieces, setPieces] = useState([]);

    useEffect(() => {
        const newPieces = Array.from({length: 150}).map((_, i) => ({
            id: i,
            style: {
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
                transform: `rotate(${Math.random() * 360}deg)`,
            },
        }));
        setPieces(newPieces);


        const timer = setTimeout(() => {
            setPieces([]);
            if (onComplete) onComplete();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="confetti-container" aria-hidden="true">
            {pieces.map(piece => (
                <div key={piece.id} className="confetti-piece" style={piece.style}/>
            ))}
        </div>
    );
};

export default Confetti;