import React from "react";
import { Button } from "antd";
import { ajaxConfigHelper } from "../../../../helper";

const PlusMinusControl = ({ ip, cart, setCart, product_id }) => {
  cart = cart ? cart : {};
  const addHandler = async (product_id) => {
    const token = window.localStorage.getItem("token");

    if (token) {
      const response = await fetch(
        "/modCartAmount",
        ajaxConfigHelper(
          {
            product_id: product_id,
            type: "+",
          },
          "PUT",
          window.localStorage.getItem("token")
        )
      );
      const { message, status } = await response.json();
      console.log(message);
    } else {
    }

    setCart((cart) => {
      return {
        ...cart,
        [product_id]: String(Number(cart[product_id]) + 1),
      };
    });
  };
  const minusHandler = async (product_id) => {
    const token = window.localStorage.getItem("token");

    if (Number(cart[product_id]) > 1) {
      if (token) {
        const response = await fetch(
          "/modCartAmount",
          ajaxConfigHelper(
            {
              product_id: product_id,
              type: "-",
            },
            "PUT",
            window.localStorage.getItem("token")
          )
        );
        const { message, status } = await response.json();
        console.log(message);
        // } else {
        //   const response = await fetch(
        //     "/modAnonymousCartAmount",
        //     ajaxConfigHelper(
        //       {
        //         ip: ip,
        //         product_id: product_id,
        //         type: "-",
        //       },
        //       "PUT"
        //     )
        //   );
        //   const { message, status } = await response.json();
        //   console.log(message);
      }

      setCart((cart) => {
        return {
          ...cart,
          [product_id]: String(Number(cart[product_id]) - 1),
        };
      });
    } else {
      if (token) {
        const response = await fetch(
          "/deleteCartProduct",
          ajaxConfigHelper(
            {
              product_id: product_id,
            },
            "DELETE",
            window.localStorage.getItem("token")
          )
        );

        const { message, status } = await response.json();
        console.log(message);
      } else {
      }
      setCart((cart) => {
        return {
          ...cart,
          [product_id]: String(0),
        };
      });
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Button onClick={() => minusHandler(product_id)}>-</Button>
      <div style={{ margin: "0 10px" }}>{cart[product_id]}</div>
      <Button onClick={() => addHandler(product_id)}>+</Button>
    </div>
  );
};

export default PlusMinusControl;
