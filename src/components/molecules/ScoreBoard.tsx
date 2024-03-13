import React from "react";

const ScoreBoard: React.FC<{ score: number }> = ({ score }) => {
    return (
        <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Your Score:</h2>
            <p className="text-lg">{score}</p>
        </div>
    );
};

export default ScoreBoard;
