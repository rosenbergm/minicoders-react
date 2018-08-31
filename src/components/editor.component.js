import React, { Component } from 'react';
import AceEditor from 'react-ace'
import brace from 'brace'
import Queries from '../managers/queries'
import { Query } from 'react-apollo';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';

import 'brace/ext/language_tools';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

class Editor extends Component {
  constructor(props) {
    super(props)

    this.resultBuffer = []
    this.state = {
      res: [],
      value: `let i = 2;\nconsole.log(i);`,
      console: '',
      task: undefined,
      correctAnswer: false
    }

    var original = window.console;
    window.console = {
      log: (args) => {
        this.resultBuffer.push(args);
        // this.setState({
        //   console: `${this.resultBuffer.join('<br />')}`,
        // });
        original.log.apply(original, [args]);
      }
      , warn: (args) => {
        original.warn.apply(original, [args]);
      }
      , error: (args) => {
        original.error.apply(original, [args]);
        this.setState({ console: `${this.state.console}<br /> <span class='error'>${args}</span>` });
      }
    }
  }

  clearConsole() {
    this.setState({ console: '' });
    this.resultBuffer = []
  }

  evaluate() {
    this.clearConsole()
    try {
      const result = Function(this.state.task.progress+'; return '+this.state.task.task.test)()
      this.setState({ correctAnswer: result })
    } catch (e) {
      console.error(e);
    } finally {

    }
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (!this.state.task || this.state.task.id !== this.props.task.id) {
      this.setState({ task: this.props.task })
    }
  }

  render () {
    return (
      <div style={{ display: 'flex' }}>
        {this.state.task &&
        <div>
          <AceEditor
            mode="javascript"
            theme="monokai"
            value={this.state.task.progress}
            onChange={(text) => { this.setState({ task: { ...this.state.task, progress: text } }) }}
            name="content"
            fontSize={13}
            tabSize={2}
            editorProps={{$blockScrolling: true}}
            enableBasicAutocompletion={true}
            enableLiveAutocompletion={true}
            enableSnippets={true}
            //width={window.innerWidth/2 + 'px'}
          />
          <div>{this.state.task.task.problem}</div>
          <div>{this.state.correctAnswer && <span>Spravne.</span>}</div>
          <div>{!this.state.correctAnswer && <span>Spatne.</span>}</div>
          <div>
            <Button onClick={() => this.evaluate()}>Spustit program</Button>
            <Button onClick={() => this.clearConsole()}>Vyčistit konzoli</Button>
          </div>
          <div>
            <div dangerouslySetInnerHTML={{__html: this.state.console}} />
              <div style={{ float:"left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
              </div>
          </div>
        </div>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { task: state.task };
}

export default connect(mapStateToProps)(Editor);
