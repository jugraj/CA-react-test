import { FC } from "react";
import { Data } from "../types/data.types";
import "./item.styles.scss";

interface OwnProps {
  data: Data;
}

const Item = ({ data }: OwnProps) => {
  return (
    <div className="item">
      <div>ID: {data.id}</div>
      <div>Name: {data.name}</div>
      <div>Price: £{data.price}</div>
      <div>Updated at: {data.updated_at}</div>
    </div>
  );
};
export default Item;
