import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import store from '../redux/store'

class Console extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: true
    }
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render () {
    console.log(this.state)
    return (
      <div className="console">
        {/*<div class="toggle" onClick={() => { this.setState({ visible: !this.state.visible }) }}>toggle</div>*/}
        <Button style={{ display: `${this.state.visible ? 'block' : 'none'}` }} onClick={() =>
          store.dispatch({
            type: 'CLEAR_CONSOLE'
          })
        }>Vyčistit</Button>
        {this.props.console &&
        <div style={{ display: `${this.state.visible ? 'block' : 'none'}`, height: '120px', overflow: 'auto' }}>
            {this.props.console.map((log, index) => (
              <div key={index}>
                <div dangerouslySetInnerHTML={{__html: log}} />
              </div>
            ))}
          <div style={{ float:"left", clear: "both" }}
            ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </div>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { console: state.console };
}

export default connect(mapStateToProps)(Console);
