import { Provider } from "react-redux";
import "./App.css";
import { store } from "./store";
import Form from "./components/Form/Form";
import Cards from "./components/Card/Cards";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">Pokedex</header>
        <div className="width-wrapper">
          <Form />
          <Cards />
        </div>
      </div>
    </Provider>
  );
}

export default App;
