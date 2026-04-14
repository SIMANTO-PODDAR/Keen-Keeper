import { createContext, useState } from "react";

export const TLContext = createContext();

const TimeLineContext = ({ children }) => {

    const [TimeLineData, setTimeLineData] = useState([]);

    const valueObj = { TimeLineData, setTimeLineData };

    return (
        <TLContext.Provider value={valueObj}>
            {children}
        </TLContext.Provider>
    );
};

export default TimeLineContext;