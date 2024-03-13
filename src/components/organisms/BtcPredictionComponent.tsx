import React, { useState, useEffect } from "react";
import RealTimePrice from "../molecules/RealTimePrice";
import ScoreBoard from "../molecules/ScoreBoard";
import UserID from "../molecules/UserID.tsx";
import BettingFunctions from "../molecules/BettingFunctions.tsx";
import {fetchUserDetails} from "../../utils/utilsFunctions.ts";

const BtcPredictionComponent: React.FC = () => {
    const [userId, setUserId] = useState<string>('');
    const [userScore, setUserScore] = useState<number>(0);
    const [userStatus, setUserStatus] = useState<string>('pending');

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchUserDetails(userId, setUserStatus, setUserScore);
        }, 1000);

        fetchUserDetails(userId, setUserStatus, setUserScore);

        return () => clearInterval(intervalId);
    }, [userId, setUserStatus, setUserScore]);

    useEffect(() => {
        if (!userId) {
            setUserStatus('pending');
        }
    }, [userId]);


    return (
        <div className="container mx-auto py-8">
            <UserID userId={userId} setUserId={setUserId}/>
            <RealTimePrice />
            <BettingFunctions userId={userId} userStatus={userStatus} setUserStatus={setUserStatus}/>
            <ScoreBoard score={userScore} />
        </div>
    );
};

export default BtcPredictionComponent;
