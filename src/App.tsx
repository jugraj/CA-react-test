import { memo, useEffect, useState } from "react";
import "@fontsource/roboto";
import { io } from "socket.io-client";

import Item from "./components/item";
import "./styles.scss";
import { Data } from "./types/data.types";

const socket = io("http://localhost:8282");

const App = () => {
    const [data, setData] = useState<Data[]>();

    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
    const [isConnected, setIsConnected] = useState(socket.connected);


    useEffect(() => {
        socket.disconnect();
        socket.on("connect", () => {
            setIsConnected(true);
        });
        socket.on("disconnect", () => {
            setIsConnected(false);
        });
        socket.connect();
        return () => {
            socket.off("connect");
            socket.off("disconnect");
        };
    }, []);

    useEffect(() => {
        if (isConnected) {
            socket.emit("items.create");
            socket.on("items.create", (arg: Data[]) => {
                setData(arg);
            });
        }
    }, [isConnected]);

    const subscribe = () => {
        setIsSubscribed(true);
        socket.emit("items.subscribe");
        socket.on("items.subscribe", (newData: Data[]) => {
            setData(newData);
        });
    };

    const unsubscribe = () => {
        socket.emit("items.unsubscribe");
        setIsSubscribed(false);
    };

    return (
        <div className="App">
            {!isConnected && <div>Loading...</div>}
            <div className="items_holder">
                {data?.map((info, i) => (
                    <Item key={`${info.id}_${i}`} data={info} />
                ))}
            </div>
            
            <hr />
            <button
                className="app-button"
                disabled={loading || isSubscribed}
                onClick={subscribe}
            >
                Subscribe
            </button>
            <button
                className="app-button--unsubscribe"
                disabled={loading || !isSubscribed}
                onClick={unsubscribe}
            >
                Unsubscribe
            </button>
        </div>
    );
};

export default memo(App);
