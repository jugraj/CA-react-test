import { memo, useEffect, useLayoutEffect, useState } from "react";
import { Data } from "../types/data.types";
import "./item.styles.scss";

interface OwnProps {
  data: Data;
}

const Item = ({ data }: OwnProps) => {
  const [priceColor, setPriceColor] = useState<
    "positive" | "negative" | "noChange"
  >("noChange");
  const [price, setPrice] = useState<number>();

  useLayoutEffect(() => {
    setPrice(data.price);
    if (price) {
      if (data.price > price) {
        setPriceColor("positive");
      } else if (data.price < price) {
        setPriceColor("negative");
      }
    }
  }, [data.price]);

  return (
    <div className="item">
      <div className="item__header">{data.name}</div>
      <div>ID: {data.id}</div>
      <div className={`price--${priceColor}`}>Price: £{data.price}</div>
      <div>Updated at: {data.updated_at}</div>
    </div>
  );
};
export default memo(Item);
