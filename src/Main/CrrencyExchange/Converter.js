import React from "react";
import InputConrol from "./commonControls/InputConrol";
import SelectControl from "./commonControls/SelectControl";
import fx from "money";

const APIcall =
  "https://gist.githubusercontent.com/mddenton/062fa4caf150bdf845994fc7a3533f74/raw/27beff3509eff0d2690e593336179d4ccda530c2/Common-Currency.json";

const exchangeRates = "https://api.exchangeratesapi.io/latest?base=USD";
class Converter extends React.Component {
  //initial values
  state = {
    currencyList: {},
    convertFrom: "USD",
    convertTo: "CAD",
    inputValue: 0,
    convertedValue: 0,
    disableInput: false,
    disableResult: false
  };

  componentDidMount() {
    //making API call
    fetch(APIcall)
      .then(response => response.json())
      .then(data => this.setState({ currencyList: data }));
    //making API call
    fetch(exchangeRates)
      .then(response => response.json())
      .then(data => {
        fx.rates = data.rates;
        fx.base = data.base;
      });
  }

  //setting values on convert from currency change
  onSelectFromChange = (convertFrom, disableTF) => {
    let inpVal = this.state.inputValue;
    inpVal = convertFrom === 0 ? 0 : inpVal;
    this.setState(
      { convertFrom: convertFrom, disableInput: disableTF, inputValue: inpVal},
      this.calculateValue
    );
  };

  //setting values on convert to currency change
  onSelectToChange = (convertTo, disableTF) => {
    this.setState(
      { convertTo: convertTo, disableResult: disableTF },
      this.calculateValue
    );
  };

  //getting convertion rate from fx
  calculateValue = () => {
    let inputValue = parseInt(this.state.inputValue, 10);
    let convertedValue = 0;
    if (inputValue > 0) {
      convertedValue = fx(inputValue)
        .from(this.state.convertFrom)
        .to(this.state.convertTo);
    }
    this.setState({ convertedValue: convertedValue });
  };

  //on input value change
  onCurrencyChange = value => {
    this.setState({ inputValue: value }, this.calculateValue);
  };

  //getting current currency exchange symbol
  getSymbol = fcurrency => {
    if (fcurrency === 0 || fcurrency === undefined) {
      return "";
    }
    let currencys = this.state.currencyList;
    let currencySymbol = Object.assign({}, currencys[fcurrency]);
    return currencySymbol.symbol;
  };

  render() {
    let {
      currencyList,
      convertFrom,
      convertTo,
      convertedValue,
      disableInput,
      disableResult
    } = this.state;

    let resultSymbol = this.getSymbol(this.state.convertTo) + " ";
    let placeHolderSymbol = this.getSymbol(this.state.convertFrom);
    return (
      <section className="wrapper">
        <h2>Currency Converter</h2>
        <section className="converter-wrapper">
          <label className="control-label">Convert From</label>
          <SelectControl
            currencyList={currencyList}
            onSelectChange={this.onSelectFromChange}
            selected={convertFrom}
            excnageRates={fx}
          />
        </section>
        <section className="converter-wrapper">
          <label className="control-label">Enter amount</label>
          <InputConrol
            onCurrencyChange={this.onCurrencyChange}
            placeHolderSymbol={placeHolderSymbol}
            convertFrom={convertFrom}
            disableInput={disableInput || disableResult}
            value={this.state.inputValue}
          />
        </section>
        <section className="converter-wrapper">
          <label className="control-label">Convert To</label>
          <SelectControl
            currencyList={currencyList}
            onSelectChange={this.onSelectToChange}
            selected={convertTo}
            excnageRates={fx}
          />
        </section>
        <section className="converter-wrapper amount">
          <label className="control-label">Amount</label>
          <span>
            {resultSymbol}
            <strong className="result">
              {isNaN(convertedValue) ? 0 : convertedValue}
            </strong>
          </span>
        </section>
      </section>
    );
  }
}

export default Converter;
