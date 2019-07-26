import React from "react";

class SelectControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
      excnageRates: props.excnageRates,
      errorMessage: ""
    };
  }

  //on change select box value and passing value to parent
  handleChange = event => {
    const targetVal = event.target.value;
    this.setState({ selected: targetVal });
    let rates = Object.assign({}, this.state.excnageRates);
    let convertedValue = rates.rates[targetVal];
    if (convertedValue) {
      this.props.onSelectChange(targetVal, false);
      this.setState({
        errorMessage: ""
      });
    } else {
      this.props.onSelectChange(0, true);
      this.setState({
        errorMessage: "This currency exchange is not available"
      });
    }
  };

  render() {
    let { currencyList } = this.props;
    let { errorMessage } = this.state;
    return (
      <section className="select-control">
        <select value={this.state.selected} onChange={this.handleChange}>
          {Object.keys(currencyList).map((keyName, i) => (
            <option
              key={currencyList[keyName].code + i}
              value={currencyList[keyName].code}
            >
              {currencyList[keyName].name}
            </option>
          ))}
        </select>
        {errorMessage.length > 0 && (
          <span className="error-message">{this.state.errorMessage}</span>
        )}
      </section>
    );
  }
}

export default SelectControl;
