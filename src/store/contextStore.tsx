import { createContext } from "solid-js";

export function createContextStore<T>(store: T, modifiers) {

    const initialValue = [
        store,
        modifiers
    ];
    
    const Context = createContext(initialValue);

    return {
        Context: Context,
        Provider(props: { children: any; }) {
            return (
                <Context.Provider value={initialValue}>
                    {props.children}
                </Context.Provider>
            );
        }
    }
}