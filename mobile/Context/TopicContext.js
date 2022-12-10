import {useState, createContext} from "react";

export const topicContext = createContext('');

export default function ContextProvider(props) {
    const [topic, setTopic] = useState('');

    return (
        <topicContext.Provider value={[topic, setTopic]}>
            {props.children}
        </topicContext.Provider>
    )
}