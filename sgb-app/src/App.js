import React from 'react';
import Rotas from './rotas.js';
import NavBar from './components/navbar/navbar.js';
import Breadcrumbs from './components/breadcrumbs.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './custom.css';
import 'toastr/build/toastr.css';
import 'toastr/build/toastr.min';

const path = window.location.pathname;
const isLoginPage = path === '/login' || path === '/cadastrar';

class App extends React.Component {

  render() {
    return (
      <div>
        {isLoginPage ? null : (
          <>
            <NavBar />
            <Breadcrumbs />
          </>
        )}
        <Rotas />
      </div>
    );

  }
}

export default App;
