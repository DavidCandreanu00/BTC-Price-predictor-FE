import React, {Dispatch, SetStateAction} from "react";
import BettingButton from "../atoms/BettingButton.tsx";
import {placeBet} from "../../utils/utilsFunctions.ts";

type BettingFunctionsProps = {
    userId: string,
    userStatus: string,
    setUserStatus: Dispatch<SetStateAction<string>>,
}
const BettingFunctions: React.FC<BettingFunctionsProps> = (
    {
        userId,
        userStatus,
        setUserStatus
    }) => {
    return (
        <div className="flex justify-center mb-12">
            <BettingButton
                prediction="up"
                status={userStatus}
                setStatus={setUserStatus}
                onClick={() => {
                    placeBet('up', userId);
                    setUserStatus('pending');
                }}
            />
            <BettingButton
                prediction="down"
                status={userStatus}
                setStatus={setUserStatus}
                onClick={() => {
                    placeBet('down', userId);
                    setUserStatus('pending');
                }}
            />
        </div>
    );
};

export default BettingFunctions;
