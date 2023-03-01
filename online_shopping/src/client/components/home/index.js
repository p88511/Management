import Header from "../header";
import Authentication from "../authentication";
import { useState, useEffect, useRef } from "react";
import { PANEL_STATUS } from "../constants";
import MainPage from "../main_page";
import Cart from "../../../server/database/cartModel";
import { ajaxConfigHelper, getUserIP } from "../../helper";
import PreLoader3 from "../loading";
const { v4: uuidv4 } = require("uuid");

const Home = ({ setHasError }) => {
  const [panelStatus, setPanelStatus] = useState(PANEL_STATUS.LOADDING);
  const [visible, setVisible] = useState(true);
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [sortStatus, setSortStatus] = useState("last_added");
  const [cart, setCart] = useState(
    window.localStorage.getItem("cart")
      ? JSON.parse(window.localStorage.getItem("cart"))
      : null
  );
  const [user, setUser] = useState(
    window.localStorage.getItem("user")
      ? JSON.parse(window.localStorage.getItem("user"))
      : null
  );
  const [detailId, setDetailId] = useState(null);
  const [isOnDetailPage, setIsOnDetailPage] = useState(false);
  const [isMerged, setIsMerged] = useState(true);
  const [ip, setIp] = useState("");

  const [userUseEffectFinished, setUserUseEffectFinished] = useState(false);
  const [cartUseEffectFinished, setCartUseEffectFinished] = useState(false);

  const shouldLogUser = useRef(true);
  const shouldLogProducts = useRef(true);
  const shouldLogEditId = useRef(true);
  const shouldLogSortStatus = useRef(true);
  const shouldLogDetailId = useRef(true);
  const shouldLogIsOnDetailPage = useRef(true);
  const shouldLogCart = useRef(true);

  const mergeCart = (localCartData, userCart) => {
    const curUser = JSON.parse(window.localStorage.getItem("user"));
    const mergedCartData = { ...localCartData };
    console.log(`curUser is ${curUser}`);
    console.log(JSON.stringify(localCartData));
    console.log(JSON.stringify(userCart));

    const modCartDb = async (product_id, user_id, amount) => {
      // const response = await fetch(
      //   "/mergeCartAmount",
      //   ajaxConfigHelper(
      //     { user_id: user_id, product_id: product_id, amount: amount },
      //     "PUT"
      //   )
      // );
      // const { message, status } = await response.json();
      // if (status === "succeed") {
      //   console.log(`product with id ${product_id} modified in DATABASE NOW`);
      // }
    };

    const addCartDb = async (product_id, user_id, amount) => {
      const productsData = JSON.parse(window.localStorage.getItem("products"));
      const product = productsData.find((product) => product.id === product_id);
      const response = await fetch(
        "/addCartProduct",
        ajaxConfigHelper(
          {
            id: uuidv4(),
            product_id: product_id,
            product_name: product.name,
            amount: amount,
          },
          "POST",
          window.localStorage.getItem("token")
        )
      );

      const { message, status } = await response.json();
      if (status === "201") {
        console.log(`product with id ${product_id} added to DATABASE `);
      }
    };

    for (const key in userCart) {
      if (localCartData.hasOwnProperty(key)) {
        mergedCartData[key] = String(
          Number(mergedCartData[key]) + Number(userCart[key])
        );
      } else {
        mergedCartData[key] = userCart[key];
      }
    }

    // merge后 修改DB
    for (const key in mergedCartData) {
      if (userCart.hasOwnProperty(key)) {
        modCartDb(key, curUser.id, mergedCartData[key]);
      } else {
        addCartDb(key, curUser.id, mergedCartData[key]);
      }
    }

    setIsMerged(true);
    return mergedCartData;
  };

  // gain cart data from the backend first.

  useEffect(() => {
    if (!shouldLogUser.current) {
      return;
    }
    shouldLogUser.current = false;

    console.log(JSON.parse(window.localStorage.getItem("isMerged")));
    const localIsMerged = JSON.parse(window.localStorage.getItem("isMerged"));
    if (localIsMerged) {
      setIsMerged(localIsMerged);
    }
    // gain data from localStorage
    const panelStatusData = window.localStorage.getItem("main");
    const userData = JSON.parse(window.localStorage.getItem("user"));
    console.log(`user after reload: ${JSON.stringify(userData)}`);

    async function getUserIP() {
      const response = await fetch(
        "https://geolocation-db.com/json/ef83f5c0-a91a-11ed-8af0-2752a81983d6"
      );
      const data = await response.json();

      return data;
    }

    async function fetchIpData() {
      const ipData = await getUserIP();
      console.log(ipData.IPv4);
      setIp(ipData.IPv4);
      // do something with the IP data here
    }

    async function getUserStatus() {
      const response = await fetch(
        `/getCustomer`,
        ajaxConfigHelper({}, "GET", window.localStorage.getItem("token"))
      );
      const { userStatus } = await response.json();
      console.log(userStatus);

      if (userStatus === "unauthenticated") {
        console.log(panelStatusData);

        if (panelStatusData === null) {
          setPanelStatus(PANEL_STATUS.SIGN_IN);
        } else {
          setPanelStatus(panelStatusData);
        }
        return;
      }

      console.log(`userData is ${JSON.stringify(userData)}`);
      // Logged in
      setUser(userData);
      setPanelStatus(panelStatusData);
    }
    if (window.localStorage.getItem("token")) {
      getUserStatus();
    }
    setPanelStatus(PANEL_STATUS.MAIN_PAGE);
    fetchIpData();

    return () => setUserUseEffectFinished(true);
  }, []);

  useEffect(() => {
    if (!shouldLogCart.current) {
      return;
    }
    shouldLogCart.current = false;

    const token = window.localStorage.getItem("token");

    async function getCart(token) {
      const response = await fetch(
        `/getCart`,
        ajaxConfigHelper({}, "GET", window.localStorage.getItem("token"))
      );
      const { status, cartInfo } = await response.json();

      if (status === "succeed") {
        console.log(`user's cart from db ${JSON.stringify(cart)}`);
        return cartInfo;
      } else {
        alert("Internal server error");
      }
    }
    let localCartData = JSON.parse(window.localStorage.getItem("cart"));
    localCartData = localCartData ? localCartData : {};

    if (!window.localStorage.getItem("token")) {
      setCart(localCartData);
      return () => {
        setCartUseEffectFinished(true);
      };
    }
    // pull data from localStorage first.
    //const cartData = JSON.parse(window.localStorage.getItem("cart"));
    let newCart = null;

    getCart(token).then((userCart) => {
      console.log(
        `user cart from getCart FUNCTION: ${JSON.stringify(userCart)}`
      );

      const isMergedData = JSON.parse(window.localStorage.getItem("isMerged"));
      console.log(`isMergedData is ${isMergedData}`);

      newCart = isMergedData
        ? localCartData
        : mergeCart(localCartData, userCart);
      console.log(`newly MERGED CART IS ${JSON.stringify(newCart)}`);
      setCart(newCart);

      setCartUseEffectFinished(true);
    });

    console.log(`newly MERGED CART IS ${JSON.stringify(newCart)}`);
    setCart(newCart);

    return () => {
      setCartUseEffectFinished(true);
    };
  }, [userUseEffectFinished]);

  useEffect(() => {
    if (!shouldLogProducts.current) {
      return () => {};
    }
    shouldLogProducts.current = false;

    console.log(
      `reached here in second useEffect and panelStatus is ${panelStatus}`
    );
    // if user current in authentication page, no need to gain products data.
    if (
      panelStatus === PANEL_STATUS.SIGN_IN ||
      panelStatus === PANEL_STATUS.SIGN_UP ||
      panelStatus === PANEL_STATUS.UPDATE_PASSWORD
    ) {
      return () => {};
    }

    // Gain data from localStorage first.
    async function getAllProducts() {
      const response = await fetch("/getAllProducts");

      const { status, products } = await response.json();

      console.log(`GET products request status: ${status}`);
      if (status === "succeed") {
        setProducts(products);
      } else {
        alert("Internal server error");
      }
    }

    const productsData = JSON.parse(window.localStorage.getItem("products"));

    // When use logged in, the product data in localStorage is null.
    // So we get all data from DB, and save to localStorage.
    if (productsData !== null) {
      setProducts(productsData);
    } else {
      getAllProducts();
    }
  }, []);

  useEffect(() => {
    if (!shouldLogEditId.current) {
      return () => {};
    }
    shouldLogEditId.current = false;

    const editIdData = window.localStorage.getItem("editId");
    if (editIdData !== null) {
      setEditId(editIdData);
    }
  }, []);

  useEffect(() => {
    if (!shouldLogDetailId.current) {
      return () => {};
    }
    shouldLogDetailId.current = false;

    const detailIdData = window.localStorage.getItem("detailId");
    if (detailIdData !== null) {
      setDetailId(detailIdData);
    }
  }, []);

  useEffect(() => {
    if (!shouldLogSortStatus.current) {
      return () => {};
    }
    shouldLogSortStatus.current = false;

    const sortStatusData = window.localStorage.getItem("sortStatus");
    if (sortStatusData !== null) {
      setSortStatus(sortStatusData);
    }
  }, []);

  useEffect(() => {
    if (!shouldLogIsOnDetailPage.current) {
      return () => {};
    }
    shouldLogIsOnDetailPage.current = false;

    const isOnDetailPageData = JSON.parse(
      window.localStorage.getItem("isOnDetailPage")
    );
    if (isOnDetailPageData !== null) {
      setIsOnDetailPage(isOnDetailPageData);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("main", panelStatus);
    window.localStorage.setItem("user", JSON.stringify(user));
    // window.localStorage.setItem("products", JSON.stringify(products));
    // window.localStorage.setItem("editId", editId);
    // window.localStorage.setItem("sortStatus", sortStatus);

    // window.localStorage.setItem("cart", JSON.stringify(cart));

    // window.localStorage.setItem(
    //   "isOnDetailPage",
    //   JSON.stringify(isOnDetailPage)
    // );
    // window.localStorage.setItem("detailId", detailId);
    // window.localStorage.setItem("isMerged", JSON.stringify(isMerged));
  }, [
    panelStatus,
    user,
    // products,
    // editId,
    // sortStatus,
    // cart,
    // isOnDetailPage,
    // isMerged,
  ]);

  return panelStatus === PANEL_STATUS.LOADDING ? (
    <div>loading...</div>
  ) : (
    <>
      <Header
        cart={cart}
        user={user}
        products={products}
        setUser={setUser}
        visible={visible}
        setVisible={setVisible}
        panelStatus={panelStatus}
        setPanelStatus={setPanelStatus}
        setProducts={setProducts}
        setCart={setCart}
        setIsMerged={setIsMerged}
      ></Header>
      {panelStatus === PANEL_STATUS.SIGN_IN ||
      panelStatus === PANEL_STATUS.SIGN_UP ||
      panelStatus === PANEL_STATUS.UPDATE_PASSWORD ||
      panelStatus === PANEL_STATUS.LINK_SENT ? (
        <Authentication
          cart={cart}
          setIsMerged={setIsMerged}
          setCart={setCart}
          user={user}
          setUser={setUser}
          visible={visible}
          setVisible={setVisible}
          panelStatus={panelStatus}
          setPanelStatus={setPanelStatus}
        ></Authentication>
      ) : (
        <MainPage
          ip={ip}
          setHasError={setHasError}
          // isOnDetailPage={isOnDetailPage}
          // setIsOnDetailPage={setIsOnDetailPage}
          detailId={detailId}
          setDetailId={setDetailId}
          cart={cart}
          setCart={setCart}
          user={user}
          editId={editId}
          setEditId={setEditId}
          products={products}
          setProducts={setProducts}
          panelStatus={panelStatus}
          setPanelStatus={setPanelStatus}
          sortStatus={sortStatus}
          setSortStatus={setSortStatus}
        ></MainPage>
      )}
    </>
  );
};

export default Home;
