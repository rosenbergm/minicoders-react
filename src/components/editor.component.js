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

    this.resultBuffer = []
    this.state = {
      value: `let i = 2;\nconsole.log(i);`,
      task: undefined,
      correctAnswer: false
    }
  }

  evaluate() {
    try {
      const result = Function(this.state.task.progress+'; return '+this.state.task.task.test)()
      if (result) console.success('Ano to je spravne.')
      else console.error('Bohuzel, je tam nekde chybka')
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
      <div style={{ display: 'flex', flex: 1 }}>
        {this.state.task &&
        <div style={{ display: 'block' }}>
          <div>{this.state.task.task.problem}</div>
          <AceEditor
            mode="javascript"
            theme="monokai"
            value={this.state.task.progress}
            onChange={(text) => { this.setState({ task: { ...this.state.task, progress: text } }) }}
            name="content"
            fontSize={15}
            tabSize={2}
            editorProps={{$blockScrolling: true}}
            enableBasicAutocompletion={true}
            enableLiveAutocompletion={true}
            enableSnippets={true}
            //width={window.innerWidth/2 + 'px'}
          />
          <div>
            <Button onClick={() => this.evaluate()}>Spustit program</Button>
            <Mutation
              onCompleted={(data) => {
                console.success('Program uložen.')
              }}
              mutation={Mutations.UPDATE_TASK}
              variables={{data: { taskId: this.state.task.id, progress: this.state.task.progress }}}
            >
              {(updateProgress, { loading, error, data } ) => {
                if (loading) return <Loader />;

                return (<Button onClick={() => updateProgress()}>Uložit</Button>)
              }}
              </Mutation>
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
