import React, { Component } from 'react';
import AceEditor from 'react-ace'
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import store from '../redux/store'
import { Mutation } from 'react-apollo';
import Mutations from '../managers/mutations'
import Loader from './loader.component'

import 'brace/ext/language_tools';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

class Editor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: `let i = 2;\nconsole.log(i);`,
      task: undefined,
      correctAnswer: false
    }
  }

  async evaluate() {
    let finished = false
    try {
      const result = Function('console', 'consoleStack', this.state.task.progress+'; return '+this.state.task.test)(this.props.console, this.props.consoleStack)

      if (result) {
        finished = true
        this.props.console.success('Ano to je spravne.')
      }
      else this.props.console.error('Bohuzel, je tam nekde chybka')
    } catch (e) {
      this.props.console.error(e);
    } finally {
      const task = {
        userTaskId: this.state.task.userTaskId,
        taskId: this.state.task.taskId,
        progress: this.state.task.progress,
        finished
      }
      const { data, errors } = await this.props.client.mutate({
        mutation: Mutations.UPDATE_TASK,
        variables: {data: task}
      })
      store.dispatch({ type: 'UPDATE_TASK', task: { ...this.state.task, finished } })
    }
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (!this.state.task || this.state.task.taskId !== this.props.task.taskId) {
      this.setState({ task: this.props.task })
    }
  }

  render () {
    return (
      <div style={{ display: 'flex', flex: 2, height: '100%' }}>
        {this.state.task &&
        <div style={{ display: 'block', width: '100%', height: 'calc(100% - 50px)' }}>
          <AceEditor
            mode="javascript"
            value={this.state.task.progress || ''}
            onChange={(text) => { this.setState({ task: { ...this.state.task, progress: text } }) }}
            name="content"
            fontSize={15}
            tabSize={2}
            // editorProps={{$blockScrolling: true}}
            enableBasicAutocompletion={true}
            enableLiveAutocompletion={true}
            enableSnippets={true}
            height={'calc(50%)'}
            width={'100%'}
          />
          <div>
            <Button color="primary" onClick={() => this.evaluate()}>Spustit program</Button>
          </div>
        </div>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { task: state.task, consoleStack: state.console };
}

export default connect(mapStateToProps)(Editor);
