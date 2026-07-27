import React from "react";
import DealsTable from "../DealsTable/DealsTable";
import NewDealForm from "../NewDealForm/NewDealForm";
import "./App.scss";

const App = () => {
  return (
    <>
      <div className="App--header flex-row">
        <img className="App--logo" src="./loanstreet.svg" alt="LoanStreet" />
      </div>
      <div className="App">
        <DealsTable />
        <NewDealForm />
      </div>
    </>
  );
};

export default App;
