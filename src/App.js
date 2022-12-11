import { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      heroes: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://akabab.github.io/superhero-api/api/all.json")
      .then((response) => response.json())
      .then((users) =>
        this.setState(
          () => {
            return { heroes: users };
          }
          // () => {
          //   console.log(this.state);
          // }
        )
      );
  }

  onSearchChange = (e) => {
    const searchField = e.target.value.toLocaleLowerCase();

    this.setState(() => {
      return { searchField };
    });
  };

  render() {
    const { heroes, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredheroes = heroes.filter((hero) => {
      return hero.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <input
          className="search-box"
          type="search"
          placeholder="search heroes or villains"
          onChange={onSearchChange}
        />
        {filteredheroes.map((hero) => {
          return (
            <div key={hero.id}>
              <img src={hero.images.sm} alt="" />
              <h1>{hero.name}</h1>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
