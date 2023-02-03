import { MouseEventHandler, useEffect, useState } from "react";
import axios from "axios";
import "@fontsource/roboto";

import Item from "./components/item";
import "./styles.scss";
import { Data } from "./types/data.types";

export default function App() {
  const [data, setData] = useState<Data[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          "https://9ehj7v-8282.preview.csb.app/get-items",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setData(result.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error as Error);
      }
    })();
  }, []);

  const subscribe = () => {
    setIsSubscribed(true);
  };

  const unsubscribe = () => {
    setIsSubscribed(false);
  };

  return (
    <div className="App">
      {loading && <div>Loading...</div>}
      <div className="items_holder">
        {data?.map((info) => (
          <Item data={info} />
        ))}
      </div>
      {error && <div className="error">{error.message}</div>}
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
}
