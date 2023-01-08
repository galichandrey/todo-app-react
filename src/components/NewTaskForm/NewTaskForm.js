import React from "react";

export default class NewTaskForm extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      label: "",
    };
    this.onLabelChange = this.onLabelChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onLabelChange(e) {
    // e.preventDefault();
    // eslint-disable-next-line no-console
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      label: e.target.value,
    });
    // console.log(e.target.value);
  }

  onSubmit(e) {
    e.preventDefault();
    // const { addItem } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    this.props.addItem(this.state.label);
    // addItem("helllooo :D");
    // onItemAdded(label);
    this.setState({
      label: "",
    });
  }

  render() {
    const { label } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          type="text"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={label}
        />
        {/* <button type="submit">Add Item</button> */}
      </form>
    );
  }
}
