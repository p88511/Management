import "./index.css";
import { Card, Button } from "antd";
import { Table } from "react-bootstrap";
import React from "react";
import "./index.css";
import PlusMinusControl from "../../../main_page/product_card/plus_minus_controller";
import { ajaxConfigHelper } from "../../../../helper";
import { useState } from "react";
const { Meta } = Card;
const { v4: uuidv4 } = require("uuid");

export default function CartProduct({
  ip,
  user,
  cart,
  setCart,
  products,
  cartEntry,
}) {
  const productData = products.find((product) => product.id === cartEntry[0]);
  const product = productData ? productData : {};
  const quantity = product.quantity;
  const id = product.id;
  const name = product.name;
  const currentUser = user ? user : {};
  const user_id = user ? user.id : null;

  const removeHandler = async (user_id, product_id) => {
    // if (!user_id) {
    //   setCart((cart) => {
    //     return {
    //       ...cart,
    //       [product_id]: String(0),
    //     };
    //   });
    // }

    if (window.localStorage.getItem("token")) {
      const response = await fetch(
        "/deleteCartProduct",
        ajaxConfigHelper(
          {
            user_id: user_id,
            product_id: product_id,
          },
          "DELETE",
          window.localStorage.getItem("token")
        )
      );
      const { message, status } = await response.json();
    }

    setCart((cart) => {
      return {
        ...cart,
        [product_id]: String(0),
      };
    });
  };
  return (
    <Table className="cart-table">
      <tbody>
        {/* loop through cart products */}

        <tr>
          <td>&nbsp;</td>
          <td>
            <img
              src={product.imgUrl}
              style={{
                width: 80,
                height: 80,
                objectFit: "cover",
              }}
            ></img>
          </td>
          <td>${product.price}</td>
          <td>
            <PlusMinusControl
              user_id={currentUser.id}
              product_id={id}
              cart={cart}
              setCart={setCart}
            ></PlusMinusControl>
            <p
              className="remove-btn"
              style={{ marginLeft: 50, cursor: "pointer" }}
              onClick={() => removeHandler(user_id, id)}
            >
              Remove
            </p>
          </td>
        </tr>
      </tbody>
    </Table>
    //   // <div className="cart-item">
    //   //   <div className="cart-item-img">
    //   //     <img
    //   //       src={product.imgUrl}
    //   //       style={{
    //   //         width: 80,
    //   //         height: 80,
    //   //         objectFit: "cover",
    //   //       }}
    //   //     ></img>
    //   //   </div>

    //   //   <div className="cart-item-box">
    //   //     <div className="cart-item-info">
    //   //       {/* <h4 className="product-name">{product.name}</h4> */}
    //   //       <h4 className="product-price">${product.price}</h4>
    //   //     </div>

    //   //     <div className="cart-button-group">
    //   // <PlusMinusControl
    //   //   user_id={currentUser.id}
    //   //   product_id={id}
    //   //   cart={cart}
    //   //   setCart={setCart}
    //   // ></PlusMinusControl>

    //   // <Button
    //   //   className="remove-button"
    //   //   onClick={() => removeHandler(user_id, id)}
    //   // >
    //   //   Remove
    //   // </Button>
    //   //     </div>
    //   //   </div>
    //   // </div>
  );
  // return (
  //   <div className="cart-item">
  //     <div className="cart-item-img">
  //       <img src={product.imgUrl}></img>
  //     </div>

  //     <div className="cart-item-box">
  //       <div className="cart-item-info">
  //         <h4 className="product-name">{product.name}</h4>
  //         <h4 className="product-price">${product.price}</h4>
  //       </div>

  //       <div className="cart-button-group">
  //         <PlusMinusControl
  //           user_id={user ? user.id : null}
  //           product_id={id}
  //           cart={cart}
  //           setCart={setCart}
  //         ></PlusMinusControl>

  //         <Button
  //           className="remove-button"
  //           onClick={() => removeHandler(user_id, id)}
  //         >
  //           Remove
  //         </Button>
  //       </div>
  //     </div>
  //   </div>
  // );
}
