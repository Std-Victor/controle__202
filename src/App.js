import React, { Component } from "react";
import { act } from "react-dom/test-utils";

import "./App.css";
import { Activite } from "./components/Activite/Activite";
import { Detail } from "./components/Detail/Detail";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      listeActivite: [
        {
          id: 1,
          name: "Raquettes à neige",
          prix: 300,
          selectionné: false,
          img: "https://cdn-icons-png.flaticon.com/512/2200/2200326.png",
        },
        {
          id: 2,
          name: "detente et bien etre",
          prix: 400,
          selectionné: false,
          img: "https://cdn-icons-png.flaticon.com/512/2248/2248315.png",
        },
        {
          id: 3,
          name: "patrimoine et culture",
          prix: 250,
          selectionné: false,
          img: "https://cdn-icons-png.flaticon.com/512/2028/2028382.png",
        },
        {
          id: 4,
          name: "séjour en famille ",
          prix: 660,
          selectionné: false,
          img: "https://cdn-icons-png.flaticon.com/512/3020/3020920.png",
        },
      ],
      activiteSelectionne: [],
      activiteRemoved: [],
    };
  }
  getActivite = (data) => this.setState({ activiteSelectionne: data });
  getRemovedActivite = (data) =>
    this.setState({
      activiteRemoved: [
        ...this.state.activiteRemoved,
        { ...data, selectionné: false },
      ],
    });
  render() {
    return (
      <div className="App">
        <Activite
          listeActivite={this.state.listeActivite}
          activiteRemoved={this.state.activiteRemoved}
          getActivite={this.getActivite}
        />
        <Detail
          activiteSelectionne={this.state.activiteSelectionne}
          getRemovedActivite={this.getRemovedActivite}
        />
      </div>
    );
  }
}
