import React, { useState, useEffect } from "react";
import {fetchBtcPrice} from "../../utils/utilsFunctions.ts";

const RealTimePrice: React.FC = () => {
    const [btcPrice, setBtcPrice] = useState<number | null>(null);

    useEffect(() => {
        const fetchBtcPriceAndUpdate = async () => {
            await fetchBtcPrice(setBtcPrice);
        };

        fetchBtcPriceAndUpdate();

        const intervalId = setInterval(fetchBtcPriceAndUpdate, 5000);

        return () => clearInterval(intervalId);
    }, [setBtcPrice]);

    return (
        <div className="text-center mb-4">
            <h2 className="text-2xl font-bold mb-2">Bitcoin Price:</h2>
            <p className="text-xl mb-4">{btcPrice ? `$${btcPrice}` : "Loading..."}</p>
        </div>
    );
};

export default RealTimePrice;
