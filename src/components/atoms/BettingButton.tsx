import React, {Dispatch, SetStateAction} from "react";
import {betType} from "../../types/utilityTypes.ts";

type BettingButtonProps = {
    prediction: betType,
    status: string,
    setStatus: Dispatch<SetStateAction<string>>,
    onClick: () => void,
}
const BettingButton: React.FC<BettingButtonProps> = ({ prediction, status, setStatus, onClick }) => {
    return (
        <button
            className={`bg-${prediction === "up" ? "green" : "red"}-500 
                ${status === "pending" ? 'cursor-not-allowed opacity-50' :
                'hover:bg-' + (prediction === "up" ? "green" : "red") + '-600'} 
                text-white font-bold py-2 px-4 rounded mr-2`}
            onClick={
                status === 'pending'
                    ? undefined
                    : () => {
                        onClick();
                        setStatus('pending');
                    }
            }
            disabled={status === 'pending'}
        >
            Bet {prediction === "up" ? "Higher" : "Lower"}
        </button>

    );
};

export default BettingButton;
