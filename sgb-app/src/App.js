import React from 'react';
import Rotas from './rotas.js';
import NavBar from './components/navbar';
import 'bootswatch/dist/lux/bootstrap.css';
import 'toastr/build/toastr.css';
import 'toastr/build/toastr.min';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Rotas />
        <NavBar />
      </div>
    );

  }
}

export default App;
