import "./App.css";
import Home from "./components/home";
import React, { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Fallback } from "./components/FallBack";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const errorHandler = (error, errorInfo) => {
    console.log("Logging", error, errorInfo);
  };

  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
        <Home></Home>
      </ErrorBoundary>
    </div>
  );
}

export default App;
