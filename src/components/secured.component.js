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
        <Tasks client={this.props.client} />
        <div className="App-main">
          <MiniNavbar />
          <div style={{ display: 'flex', justifyContent: 'space-between', height: '100%' }}>
            <Editor client={this.props.client} console={this.props.console} />
            <Console />
          </div>
        </div>
      </div>
    );
  }
}

export default SecuredComponent;
