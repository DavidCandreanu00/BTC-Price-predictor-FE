import React, { useEffect, Dispatch, SetStateAction, useState } from "react";
import {API_URL} from "../../constants/appConstants.ts";
import axios from 'axios';

type UserIDProps = {
    userId: string,
    setUserId: Dispatch<SetStateAction<string>>,
};

const UserID: React.FC<UserIDProps> = ({userId, setUserId}) => {
    const [isIDLoading, setIsIDLoading] = useState<boolean>(false);

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const handleSetUserId = async () => {
        setIsIDLoading(true);
        const response = await axios.post(API_URL + 'users', {}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const {userId} = response.data;
        if (userId) {
            localStorage.setItem("userId", userId);
            setUserId(userId);
        }
        setIsIDLoading(false);
    };

    const handleClearUserId = () => {
        localStorage.removeItem("userId");
        setUserId('');
    };

    return (
        <div className="text-center mb-4">
            <h2 className="text-xl font-bold mb-4">User ID:</h2>
            {userId ? (
                <div>
                    <p className="text-lg mb-4">{userId}</p>
                    <button
                        className={`bg-red-500 ${isIDLoading ? 'cursor-not-allowed opacity-50' : 'hover:bg-red-600'} text-white font-bold py-2 px-4 rounded mt-2 mb-6`}
                        onClick={isIDLoading ? undefined : handleClearUserId}
                        disabled={isIDLoading}
                    >
                        {isIDLoading ? 'Loading...' : 'Clear User ID'}
                    </button>
                </div>
            ) : (
                <button
                    className={`bg-blue-500 ${isIDLoading ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'} text-white font-bold py-2 px-4 rounded mb-6`}
                    onClick={isIDLoading ? undefined : handleSetUserId}
                    disabled={isIDLoading}
                >
                    {isIDLoading ? 'Loading...' : 'Set User ID'}
                </button>
            )}
        </div>
    );
};

export default UserID;
