import React, { createContext, useContext, useState, useEffect } from 'react';

interface LocationContextType {
    currentStore: string;
    setCurrentStore: (store: string) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Default store as requested in the mockup ("21 - Nilo Peçanha")
    const [currentStore, setCurrentStore] = useState<string>("21 - Nilo Peçanha");

    return (
        <LocationContext.Provider value={{ currentStore, setCurrentStore }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocationStore = () => {
    const context = useContext(LocationContext);
    if (context === undefined) {
        throw new Error('useLocationStore must be used within a LocationProvider');
    }
    return context;
};
