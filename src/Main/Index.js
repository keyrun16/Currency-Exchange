
import React, { Component } from "react";
import Converter from "./CrrencyExchange/Converter";
import "./styles.css";
//Currency Converter

//Create a currency converter that converts a user’s selected base currency and outputs the equivalent money value of the exchange currency using the current day’s rate.

//Include two select inputs, one for base currency and second for equivalent currency, which make use of the json found at:
//https://gist.githubusercontent.com/mddenton/062fa4caf150bdf845994fc7a3533f74/raw/27beff3509eff0d2690e593336179d4ccda530c2/Common-Currency.json

//For the base currency, create a masked currency input that:

// Shows the symbol of the selected base currency
// Is formatted to two decimal places
// On focus sets the cursor to the rightmost decimal position
// Only allows numbers
// Each new number is added to the right most position
// When a new number is inserted shifts the decimal right one place
// When deleted shifts the decimal left one place

// Currency rates are available from https://api.exchangeratesapi.io/latest?base=USD

// Use the money.js library (see this codesandbox's package.json) to convert the selected base currency to its chosen equivalent money value. For more details: http://openexchangerates.github.io/money.js/

// Best practice would be to inform the user if their selected currency is not available from fixer.io using inline validation. In order to more easily test error handling, allow the user to select a currency not available from fixer.io and present the error returned.

// Show the equivalent money value's currency symbol which is included in the above Common-Currency.json endpoint.

// Do not use a 3rd party library for your currency input.

// Use React but do not include jQuery in your project.

class CurrencyConverter extends Component {
  render() {
    return <Converter />;
  }
}

export default CurrencyConverter;
//ReactDOM.render(<CurrencyConverter />, document.getElementById("root"));
