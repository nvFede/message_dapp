import React, { useState, useContext } from 'react';
import WalletContext from '../context/WalletContext';

function Navbar() {

    const [navbarOpen, setNavbarOpen] = useState(false)

    const { 
        web3Provider,
        address,
        isConnected,
        chainId,
        networkId,
        metamaskError,
        contractData,
        contract,
        login,
        logout,
      } = useContext(WalletContext)
    

    return (
      <nav className="navbar " role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img
              src="https://bulma.io/images/bulma-logo.png"
              width="112"
              height="28"
            />
          </a>

          <a
            role="button"
            className={`navbar-burger burger ${navbarOpen ? 'is-active' : ''}`}
            aria-label='menu'
            aria-expanded='false'
            data-target='navbarBasicExample'
            onClick={() => {
              setNavbarOpen(!navbarOpen)
            }}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className={`navbar-menu ${navbarOpen ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <a className="navbar-item">Home</a>

            <a className="navbar-item">Documentation</a>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">More</a>

              <div className="navbar-dropdown">
                <a className="navbar-item">About</a>
                <a className="navbar-item">Jobs</a>
                <a className="navbar-item">Contact</a>
                <hr className="navbar-divider" />
                <a className="navbar-item">Report an issue</a>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <button className="button is-primary" onClick={login}>
                {address && address.length > 0
                  ? `Connected: ${address.substring(
                      0,
                      6
                    )}...${address.substring(38)}`
                  : "Login"}
              </button>
            </div>
          </div>
        </div>
      </nav>
    );

}

export { Navbar };