import React from "react";

class InputConrol extends React.Component {
  state = {
    value: this.props.value || "0.00"
  };

  //on change input value and passing value to parent
  handleChange = event => {
    let enterVal = this.doDecimal(event.target.value);

    this.setState({ value: enterVal });
    //passing value to parent component to calculate the converted value.
    this.props.onCurrencyChange(enterVal);
  };

  doDecimal = enterVal => {
    //removing decimal to take value as plain integer
    let str = enterVal.replace(".", "");
    //checking if user enter 0, then nothing to do.
    if (enterVal === "0000") {
      return false;
    }
    //removing default 0, when user start entering numbers.
    if ((str.length === 4 || str.length === 5) && str.charAt(0) === "0") {
      str = str.substring(1);
    }
    //adding default 0's, when user delete numbers.
    if (str.length === 1 || str.length === 2) {
      str = "0" + str;
    }
    //adding decimal at the end of the last two digits.
    enterVal =
      str.substring(0, str.length - 2) + "." + str.substring(str.length - 2);

    return enterVal;
  };

  render() {
    let { placeHolderSymbol, disableInput } = this.props;
    return (
      <section className="input-wrapper">
        <span className="symbol">{placeHolderSymbol}</span>
        <input
          type="number"
          value={this.state.value}
          onChange={this.handleChange}
          disabled={disableInput}
        />
      </section>
    );
  }
}

export default InputConrol;
