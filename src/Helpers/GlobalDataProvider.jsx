"use client";

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { api } from "../utils/api";
import { GlobalDataContext } from './GlobalDataContext';

export const GlobalDataProvider = ({ children, initialData = null }) => {
    const [globalData, setGlobalData] = useState(initialData);
    const [loading, setLoading] = useState(!initialData);
    const [error, setError] = useState(null);

    // Memoize the context value
    const value = useMemo(() => ({
        globalData,
        loading,
        error
    }), [globalData, loading, error]);

    useEffect(() => {
        if (initialData) return; // Skip if we already have data from server

        const fetchGlobalData = async () => {
            try {
                setLoading(true);
                const data = await api.getSettings();
                setGlobalData(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchGlobalData();
    }, [initialData]);

    return (
        <GlobalDataContext.Provider value={value}>
            {children}
        </GlobalDataContext.Provider>
    );
};
