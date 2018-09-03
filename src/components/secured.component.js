import React, { Component } from 'react';
import '../App.css';
import Tasks from './tasks.component'
import Editor from './editor.component'
import Console from './console.component'
import MiniNavbar from './navbar'

class SecuredComponent extends Component {
  render() {
    return (
      <div className="App">
        <MiniNavbar />
        <div className="App-main">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Tasks client={this.props.client} />
            <Editor client={this.props.client} console={this.props.console} />
            <Console />
          </div>
        </div>
      </div>
    );
  }
}

export default SecuredComponent;
