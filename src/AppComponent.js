import React from 'react';
import PropTypes from 'prop-types';
import logo from './assets/image/logo.svg';
import './assets/css/App.css';

const AppComponent = ({ useFoo, useGithub }) => {
  const { foo, changeFoo } = useFoo("bar");
  const { user } = useGithub("arojunior");
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Hello {foo}</h2>
        <h2>Start editing to see some magic happen!</h2>
        <button onClick={() => changeFoo("wooow")}>Change bar</button>
        <div>
          <p>
            <strong>Name: </strong>
            {user.name}
          </p>
        </div>
      </header>
    </div>
  );
};

AppComponent.propTypes = {
  useFoo: PropTypes.func.isRequired,
  useGithub: PropTypes.func.isRequired
};

export default AppComponent;
