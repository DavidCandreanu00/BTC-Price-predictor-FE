import {betType} from "../types/utilityTypes.ts";
import axios from "axios";
import {API_URL} from "../constants/appConstants.ts";
import {Dispatch, SetStateAction} from "react";

export async function placeBet(predictionValue: betType, userId: string) {
    console.log(`Placing price ${predictionValue} bet for ${userId}.`);
    try {
        await axios.post(API_URL + `users/${userId}`,
            {
                prediction: predictionValue,
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    } catch (error) {
        console.error('Error placing bet:', error);
    }
}

export async function fetchUserDetails(
    userId: string,
    setUserStatus: Dispatch<SetStateAction<string>>,
    setUserScore: Dispatch<SetStateAction<number>>,
) {
    if (!userId) {
        setUserScore(0);
        return;
    }
    try {
        const userDetailsResponse = await axios.get(API_URL + `users/${userId}`);
        const { score, status } = userDetailsResponse.data;

        setUserStatus(status);
        setUserScore(score);
    } catch (error) {
        console.error('Error fetching user details:', error);
    }
}

export async function fetchBtcPrice(setBtcPrice: Dispatch<SetStateAction<number | null>>) {
    try {
        const btcPriceResponse = await axios.get('https://min-api.cryptocompare.com/data/generateAvg?fsym=BTC&tsym=USD&e=coinbase');
        setBtcPrice(parseFloat(btcPriceResponse.data?.RAW.PRICE));
    } catch (error) {
        console.error('Error fetching BTC price:', error);
    }
}
