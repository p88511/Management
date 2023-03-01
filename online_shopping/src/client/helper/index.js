export const ajaxConfigHelper = (data, method = "POST", token) => {
  return {
    method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: new Headers({
      "authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      // Add any other headers you want to send here
    }),
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: method === "GET" ? null : JSON.stringify(data),
  };
};

export const getUserIP = async () => {
  const response = await fetch("https://geolocation-db.com/json/ef83f5c0-a91a-11ed-8af0-2752a81983d6");
  const {IP} = await response.json();

  return IP;
}
