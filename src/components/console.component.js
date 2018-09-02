import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import store from '../redux/store'

class Console extends Component {
  render () {
    return (
      <div style={{ flex: 1 }}>
        <Button onClick={() =>
          store.dispatch({
            type: 'CLEAR_CONSOLE'
          })
        }>Vyčistit</Button>
        {this.props.console &&
        <div style={{ display: 'block' }}>
            {this.props.console.map((log, index) => (
              <div key={index}>
                <div dangerouslySetInnerHTML={{__html: log}} />
              </div>
            ))}
        </div>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { console: state.console };
}

export default connect(mapStateToProps)(Console);
