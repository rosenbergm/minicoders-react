import React, { Component } from 'react';
import '../App.css';
import Tasks from './tasks.component'
import Editor from './editor.component'
import Console from './console.component'
import MiniNavbar from './navbar'
import { connect } from 'react-redux';

class SecuredComponent extends Component {
  render() {
    return (
      <div className="App">
        <Tasks client={this.props.client} />
        <div className="App-main">
          <MiniNavbar />
          <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'row', flex: 3 }}>
              <Editor client={this.props.client} console={this.props.console} />
              {this.props.task && this.props.task.canvas && <div id="container" style={{ flex: 3, margin: '2px' }}>
                <canvas id="canvas" style={{ border: '1px solid grey' }}></canvas>
              </div>}
            </div>
            <Console />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { task: state.task };
}

export default connect(mapStateToProps)(SecuredComponent);
