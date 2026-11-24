import React from 'react';
import Rotas from './rotas.js';
import Navbar from './components/layout/navbar/Navbar.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './custom.css';
import 'toastr/build/toastr.css';
import 'toastr/build/toastr.min';

class App extends React.Component {

  render() {
    return (
      <div>
        <Navbar />
        <Rotas />
      </div>
    );

  }
}

export default App;
