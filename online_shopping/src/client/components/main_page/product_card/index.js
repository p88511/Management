import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Modal, Row, Col } from "antd";
import Card from "react-bootstrap/Card";
import { CiTrash } from "react-icons/ci";

import { PANEL_STATUS } from "../../constants";
import React from "react";
import { useState, useEffect } from "react";
import "./index.css";
import { ajaxConfigHelper, getUserIP } from "../../../helper";
import PlusMinusControl from "./plus_minus_controller";
import { useErrorHandler } from "react-error-boundary";
const { Meta } = Card;
const { v4: uuidv4 } = require("uuid");

export default function ProductCard({
  ip,
  user,
  name,
  quantity,
  id,
  price,
  imgUrl,
  setPanelStatus,
  setEditId,
  setProducts,
  cart,
  setCart,
  setDetailId,
  setIsOnDetailPage,
}) {
  const [visible, setVisible] = React.useState(false);
  const handleError = useErrorHandler();

  // delete below
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    try {
      if (!cart) return;
      if (Number(cart[id]) >= 1) {
        throw new Error("Remove items from cart before delete prodcut!");
      } else {
        setVisible(false);
        // Perform the delete operation here
        const deleteResponse = await fetch(
          "/delProduct",
          ajaxConfigHelper(
            { id },
            "DELETE",
            window.localStorage.getItem("token")
          )
        );
        const { message, status } = await deleteResponse.json();
        const updatedProducts = await fetch("/getAllProducts");
        const { products } = await updatedProducts.json();

        if (status === "succeed") {
          setProducts(products);
          setPanelStatus(PANEL_STATUS.MAIN_PAGE);
        }
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const addHandler = async () => {
    if (window.localStorage.getItem("token")) {
      const response = await fetch(
        "/addCartProduct",
        ajaxConfigHelper(
          {
            id: uuidv4(),
            product_id: id,
            product_name: name,
            amount: 1,
          },
          "POST",
          window.localStorage.getItem("token")
        )
      );
      const { message, status } = await response.json();
    } else {
    }

    setCart((cart) => {
      return {
        ...cart,
        [id]: "1",
      };
    });
  };
  return (
    <div
      style={{
        cursor: "pointer",
        width: "18rem",
        margin: "10px",
      }}
      className="d-flex justify-content-center flex-wrap card-content"
    >
      <Card
        style={{
          width: "20rem",
          margin: "auto",
          height: "350px",
          textAlign: "left",
        }}
      >
        <Card.Img
          variant="top"
          style={{ height: "150px", objectFit: "cover", marginTop: "5px" }}
          src={imgUrl}
          alt={name}
          onClick={() => {
            setPanelStatus(PANEL_STATUS.PRODUCT_DETAIL);
            setDetailId(id);
            setIsOnDetailPage(true);
          }}
        />
        <Card.Body>
          <Card.Title className="card-name">{name}</Card.Title>
          {/* {quantity === "0" ? (
            <div style={{ color: "red", border: "1px solid red" }}>
              Out of Stock
            </div>
          ) : (
            <></>
          )} */}

          <Card.Title className="card-price">${Number(price)}</Card.Title>
          {cart && Number(cart[id]) > 0 ? (
            <PlusMinusControl
              ip={ip}
              user_id={user ? user.id : null}
              product_id={id}
              cart={cart}
              setCart={setCart}
            ></PlusMinusControl>
          ) : (
            <div
              className="add-to-cart"
              disabled={quantity === "0"}
              onClick={addHandler}
            >
              Add
            </div>
          )}
          {user && user.isAdmin ? (
            <div
              className="btn-edit"
              onClick={() => {
                setEditId(id);
                setPanelStatus(PANEL_STATUS.EDIT_PRODUCT);
              }}
            >
              Edit
            </div>
          ) : (
            <></>
          )}

          {user && user.isAdmin ? (
            <CiTrash
              type="danger"
              onClick={showModal}
              style={{
                width: "25px",
                height: "25px",
                marginLeft: "200px",
                color: "rgba(80, 72, 229, 1)",
                // border: "1px solid red",
                // color: "red",
                // fontWeight: "bold",
              }}
            />
          ) : (
            <></>
          )}
        </Card.Body>
        <Modal
          title="Delete This Item ?"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Yes"
          cancelText="No"
        >
          {/* <p>Delete this item?</p> */}
        </Modal>
      </Card>
    </div>
  );
  // return (
  //   <div>
  //     <div className="card">
  //       <div className="card_image">
  //         <img
  //           src={imgUrl}
  //           alt={name}
  //           onClick={() => {
  //             setPanelStatus(PANEL_STATUS.PRODUCT_DETAIL);
  //             setDetailId(id);
  //             setIsOnDetailPage(true);
  //           }}
  //         />
  //       </div>
  //       <div className="card_info">
  //         <h4>{name}</h4>
  //         {quantity === "0" ? (
  //           <div style={{ color: "red", border: "1px solid red" }}>
  //             Out of Stock
  //           </div>
  //         ) : (
  //           <></>
  //         )}
  //         <h4>${Number(price).toFixed(2)}</h4>

  //         {cart && Number(cart[id]) > 0 ? (
  //           <PlusMinusControl
  //             ip={ip}
  //             user_id={user ? user.id : null}
  //             product_id={id}
  //             cart={cart}
  //             setCart={setCart}
  //           ></PlusMinusControl>
  //         ) : (
  //           <Button disabled={quantity === "0"} onClick={addHandler}>
  //             Add
  //           </Button>
  //         )}

  //         {user && user.isAdmin ? (
  //           <Button
  //             onClick={() => {
  //               setEditId(id);
  //               setPanelStatus(PANEL_STATUS.EDIT_PRODUCT);
  //             }}
  //           >
  //             Edit
  //           </Button>
  //         ) : (
  //           <></>
  //         )}

  //         {user && user.isAdmin ? (
  //           <Button
  //             type="danger"
  //             onClick={showModal}
  //             style={{
  //               border: "1px solid red",
  //               color: "red",
  //               fontWeight: "bold",
  //             }}
  //           >
  //             Delete
  //           </Button>
  //         ) : (
  //           <></>
  //         )}
  //       </div>
  //     </div>
  //     <Modal
  //       title="Delete Item"
  //       visible={visible}
  //       onOk={handleOk}
  //       onCancel={handleCancel}
  //       okText="Yes"
  //       cancelText="No"
  //     >
  //       <p>Are you sure you want to delete this item?</p>
  //     </Modal>
  //   </div>
  // );
}
