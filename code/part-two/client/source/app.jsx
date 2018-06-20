import React from 'react';
import { createPrivateKey } from './services/signing';
import style from './style/app.less';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      privateKey: ''
    };
    this.generatePrivateKey = this.generatePrivateKey.bind(this);
  }

  generatePrivateKey() {
    if (this.state.privateKey === '') {
      this.setState({
        privateKey: createPrivateKey()
      });
    }
  }

  render() {
    let privateKeyRender = null;
    if (this.state.privateKey === '') {
      privateKeyRender = (
        <button onClick={this.generatePrivateKey}>Generate Private Key</button>
      );
    } else {
      privateKeyRender = (
        <span>{this.state.privateKey}</span>
      );
    }
    return (
      <div className={style.app}>
        <div className={style.header}>
          <h1>Welcome to Cryptomoji</h1>
          <h3>Collect and Breed Simple Mojis</h3>
        </div>
        <div className={style.login}>
          To get started, create an account by generating a private key:  
          <div>{privateKeyRender}</div>
        </div>
        <div className={style.login}>
          If you already have an account or just made one, enter your private key to sign in:
          <div><input type="password" /></div>
        </div>
      </div>
    );
  }
}

export default App;