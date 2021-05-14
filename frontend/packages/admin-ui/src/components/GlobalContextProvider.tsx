import React from "react";
import styled from "styled-components";

interface IGlobalContextProviderProps {}

interface IGlobalContextState {
    backPath?: string;
    setValue?: any;
}

const GlobalContext = React.createContext<IGlobalContextState>({});

const GlobalContextProvider: React.FunctionComponent<IGlobalContextProviderProps> = ({
    children,
}) => {
    const [state, setState] = React.useState({ backPath: "/" });

    const setGlobalState = React.useCallback(
        (newState = {}) => {
            setState((v) => ({ ...v, ...newState }));
        },
        [setState]
    );

    return (
        <GlobalContext.Provider
            value={{ backPath: state.backPath, setValue: setGlobalState }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContextProvider;
