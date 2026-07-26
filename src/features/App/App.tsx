import React from "react";
import DealsTable from "../DealsTable/DealsTable";
import NewDealForm from "../NewDealForm/NewDealForm";
import "./App.scss";
import LSLogo from "../../assets/LSLogo";

const App = () => {
  return (
    <>
      <div className="App--header flex-row">
        <img className="App--logo" src="./loanstreet.svg" />
      </div>
      <div className="App">
        <DealsTable />
        <NewDealForm />
      </div>
    </>
  );
};

export default App;
