import React, { useReducer, useContext, ReactNode } from 'react';
import { initialState, Action, reducer } from './reducer';

const Store = React.createContext({
  state: initialState,
  dispatch: (() => true) as React.Dispatch<Action>,
});

interface ProviderProps {
  children: ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};

const useDispatch = () => useContext(Store).dispatch;

const useStore = <K extends keyof typeof initialState>(prop: K) =>
  useContext(Store).state[prop];

export { Provider, useDispatch, useStore };
