import React, { Component } from "react";
import "./App.css";
import { SearchBox } from "./components/Search-box/search-box.component";
import { View } from "./components/View/view.component";
import { Form } from "./components/Form/form.component";
import { fetchData, toggleModal } from "./redux/student/student.actions";
import { connect } from "react-redux";


class App extends Component {
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => this.props.fetchData(json));
  }

  render() {
    return (
      <div className="App">
        <h1>Students List</h1>
        <div className="table--up">
          {this.props.dataFetched ? <SearchBox /> : null}
          <button className="btn__add" onClick={() => this.props.toggleModal()}>
            <i className="fa-solid fa-user-plus"></i>
          </button>
        </div>
        <View />
        <Form />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dataFetched : state.dataFetched
})

const mapDispatchToProps = (dispatch) => ({
  fetchData: (data) => dispatch(fetchData(data)),
  toggleModal: () => dispatch(toggleModal()),
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
