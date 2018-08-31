import React, { Component } from 'react';
import '../App.css';
import Tasks from './tasks.component'
import Editor from './editor.component'

class SecuredComponent extends Component {
  render() {
    return (
      <div className="App">
        <a onClick={() => this.props.logout()} href="#">Odhlasit se</a>
        <div style={{ display: 'flex' }}>
          <Tasks />
          <Editor />
        </div>

      </div>
    );
  }
}

export default SecuredComponent;
