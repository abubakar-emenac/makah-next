"use client";

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { api } from "../utils/api";
import { GlobalDataContext } from './GlobalDataContext';

export const GlobalDataProvider = ({ children }) => {
    const [globalData, setGlobalData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Memoize the context value
    const value = useMemo(() => ({
        globalData,
        loading,
        error
    }), [globalData, loading, error]);

    useEffect(() => {
        const fetchGlobalData = async () => {
            try {
                setLoading(true);

                // Fetch fresh data
                const data = await api.getSettings();

                // Save to state
                setGlobalData(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchGlobalData();
    }, []);

    return (
        <GlobalDataContext.Provider value={value}>
            {children}
        </GlobalDataContext.Provider>
    );
};
