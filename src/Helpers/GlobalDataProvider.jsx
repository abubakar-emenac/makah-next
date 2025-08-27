import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'; // Or whatever library you use for API calls
import { endpoints } from './apiEndpoints';

const GlobalDataContext = createContext();

export const GlobalDataProvider = ({ children }) => {
    const [globalData, setGlobalData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGlobalData = async () => {
            try {
                // Check if data is already in localStorage (basic caching)
                const cachedData = localStorage.getItem('globalData');
                if (cachedData) {
                    setGlobalData(JSON.parse(cachedData));
                    setLoading(false);
                    return; // Exit early if data is cached
                }

                // If no cached data, fetch from the API
                const response = await axios.get(`${endpoints.generalSettings}`);
                const data = response.data;
                setGlobalData(data);
                
                // Cache the new data in localStorage
                localStorage.setItem('globalData', JSON.stringify(data));

            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchGlobalData();
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <GlobalDataContext.Provider value={{ globalData, loading, error }}>
            {children}
        </GlobalDataContext.Provider>
    );
};
