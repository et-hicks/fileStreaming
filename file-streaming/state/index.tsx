import React, {useState, useContext, createContext} from 'react';
import { customAlphabet } from 'nanoid';

export interface UserState {
    userName: string | null;
    myUID: string; // my UID for my stream. Unique to this session ONLY
    host: boolean;
    setUserName: (userName: string) => {};
    setHost: (host: boolean) => {};
}

export const UserContext = createContext<UserState>(null!);

const myAlphabet: string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const UserStateProvider = (props: React.PropsWithChildren<{}>) => {

    // These stay, and are persistent
    const [userName, setUserName] = useState<string>('');
    const [host, setHost] = useState<boolean>(false);

    // These are built and rebuilt with every re-render
    const nanoid = customAlphabet(myAlphabet, 28);
    const myUID = nanoid();

    let userContextValue = {
        userName: userName,
        setUserName: setUserName,
        host: host,
        setHost: setHost,
        myUID: myUID,
    } as UserState;

    return (<UserContext.Provider value={{ ...userContextValue }}>
                {props.children}
            </UserContext.Provider>);

};

export const useUserState = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("Global user Context is undefined");
    }

    return context;
}

export default UserStateProvider;
