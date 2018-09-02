import React, { Component } from 'react';
import '../App.css';
import Tasks from './tasks.component'
import Editor from './editor.component'
import MiniNavbar from './navbar'

class SecuredComponent extends Component {
  render() {
    return (
      <div>
        <MiniNavbar />
        <div className="App">
          <div style={{ display: 'flex' }}>
            <Tasks />
            <Editor />
          </div>
        </div>
      </div>
    );
  }
}

export default SecuredComponent;
