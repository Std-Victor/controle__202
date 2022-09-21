import React, { Component } from "react";
import "./App.css";
import { SearchBox } from "./components/Search-box/search-box.component";
import { View } from "./components/View/view.component";
import { Form } from "./components/Form/form.component";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      openModal: false,
      editUser: "",
      deleteUseId: [],
      lastUseId: 0,
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => this.setState({ users: json }));
  }

  handleChange = (e) => this.setState({ searchField: e.target.value });

  editById = (user) =>
    this.setState({ editUser: user, openModal: true, edit: true });

  removeById = (id) =>
    this.setState({ deleteUseId: [id, ...this.state.deleteUseId] });
  getData = (data) => {
    data.id = this.state.lastUseId + 1;
    const oldUserId = this.state.users.findIndex(
      (user) => user.id === this.state.editUser.id
    );
    if (oldUserId >= 0) {
      const oldData = this.state.users;
      oldData[oldUserId] = data;
      return this.setState({
        users: oldData,
        openModal: false,
      });
    }
    return this.setState({
      users: [...this.state.users, data],
      openModal: false,
    });
  };

  render() {
    const { users, searchField, deleteUseId } = this.state;
    const filteredStd = users.filter(
      (std) =>
        std.name &&
        std.name.toLowerCase().includes(searchField.toLowerCase()) &&
        !deleteUseId.includes(std.id)
    );

    return (
      <div className="App">
        <h1>Students List</h1>
        <div className="table--up">
          <SearchBox
            placeholder="Search for Students"
            handleChange={this.handleChange}
          />
          <button
            className="btn__add"
            onClick={() =>
              this.setState({
                openModal: true,
                lastUseId: this.state.users[this.state.users.length - 1].id,
                editUser: "",
              })
            }
          >
            <i className="fa-solid fa-user-plus"></i>
          </button>
        </div>

        <View
          filteredStd={filteredStd}
          removeById={this.removeById}
          editById={this.editById}
        />

        <Form
          open={this.state.openModal}
          onclose={() => this.setState({ openModal: false })}
          getData={this.getData}
          editStd={this.state.editUser}
        />
      </div>
    );
  }
}
