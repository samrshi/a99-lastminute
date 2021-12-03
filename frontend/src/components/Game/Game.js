import React, { useState } from "react";
import "./Game.css";

export default function Game({ username }) {
  const [balance, setBal] = useState(0);
  const [cpp, setCPP] = useState(0);
  const [pepperoni, setPepperoni] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true);

 
  
  const getBal = () => {
    fetch("/app/users/getbal/" + username)
      .then((res) => res.json())
      .then((json) => {
        setBal(json.result);
      });
  };
  const getCPP = () => {
    fetch("/app/users/getcpp/" + username)
      .then((res) => res.json())
      .then((json) => {
        setCPP(json.result);
      });
  };
  const getPepperoni = () => {
    fetch("/app/users/getpepperoni/" + username)
      .then((res) => res.json())
      .then((json) => {
        setPepperoni(json.result);
      });
  };


  const updateBal = () => {
    var requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        balance: balance + cpp,
      }),
    };
    fetch("/app/users/setbal/" + username, requestOptions)
      .then((res) => res.json())
      .then((json) => setBal(json.balance));
  };
  const updateCPP = () => {
    var requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cpp: 10 + 3*pepperoni,
      }),
    };
    fetch("/app/users/setcpp/" + username, requestOptions)
      .then((res) => res.json())
      .then((json) => setCPP(json.cpp));
  };
  const updatePepperoni = () => {
    var requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pepperoni: 1,
      }),
    };
    fetch("/app/users/setpepperoni/" + username, requestOptions)
      .then((res) => res.json())
      .then((json) => setPepperoni(json.pepperoni))
      .then(updateCPP);
  };


  if (firstLoad) {
    getBal();
    getCPP();
    getPepperoni();
    setFirstLoad(false);
  }

  return (
    <div className="gameboard">
      <div className="welcome">Welcome to {username}'s pizzeria</div>

      <div className="wrapper">
        <button className="pizza_button" onClick={updateBal}></button>

        <div className="bank">
          BANK
          <p>Balance: $ {balance}</p>

          <div className="text">
            <p>Price per Pizza: $ {cpp}</p>
            <p>Total Spending:</p>
            <p>Revenue:</p>
          </div>
        </div>
      </div>

      <div className="bottomwrapper">
        <div className="store">
          <h1 className="oven_header">Store</h1>
          <button className="pep" onClick={updatePepperoni}>Pepperoni: $1000 {pepperoni}</button>

          <button className="oven">Mushrooms: $1200</button>
          <button className="oven">Peppers: $1400</button>
          <button className="oven">Sausage: $1600</button>
          <button className="oven">Olives: $1800</button>
          <button className="oven">Cheese: $2000</button>
        </div>

        <div className="leaderboard">Leaderboard</div>
      </div>
    </div>
  );
}
