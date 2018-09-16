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
    this.intervals = []

    this.state = {
      value: `let i = 2;\nconsole.log(i);`,
      task: undefined,
      correctAnswer: false
    }
  }

  async evaluate() {
    let finished
    try {
      let after = ''
      let canvas = ''
      if (this.state.task.canvas) {
        canvas = `const canvas = document.getElementById('canvas')
          const context = canvas.getContext('2d')
          const canvasWrap = document.getElementById('container')

          let ballColor = '#000'
          let ballRadius = 10

          const width = canvasWrap.offsetWidth - 5
          const height = canvasWrap.offsetHeight - 5

          canvas.width = width
          canvas.height = height

          let posX = 0
          let posY = 0

          function drawBall() {
            init()

            window.positionStack.push(posX+'x'+posY+'y')
            context.beginPath();
            context.arc(posX, posY, ballRadius, 0, Math.PI*2);
            context.fillStyle = ballColor;
            context.fill();
            context.closePath();
          }

          function init() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = '#fff';
            context.fillRect(0, 0, canvas.width, canvas.height)
          }
          `

          after = `
            window.canvasWidth = width
            window.canvasHeight = height
            window.ballRadius = ballRadius
            `
      }

      const result = Function('console', canvas+this.state.task.progress+after+'; return '+this.state.task.test)(this.props.console)


      if (this.state.task.canvas) {
        window.clearIntervals()
        window.intervals.push(setInterval(() => {
          const testResult = Function('return '+this.state.task.test)()

          const start = `${window.ballRadius}x${window.ballRadius}y`
          const rightTopCorner = `${window.canvasWidth-window.ballRadius}x${window.ballRadius+1}y`
          const rightBottomCorner = `${window.canvasWidth-window.ballRadius-1}x${window.canvasHeight-window.ballRadius}y`
          const leftBottomCorner = `${window.ballRadius}x${window.canvasHeight-window.ballRadius-1}y`
          this.props.console.log(window.positionStack.includes(start))
          this.props.console.log(window.positionStack.includes(rightTopCorner), rightTopCorner)
          this.props.console.log(window.positionStack.includes(rightBottomCorner), rightBottomCorner)
          this.props.console.log(window.positionStack.includes(leftBottomCorner), leftBottomCorner)
        }, 5000))
      }

      if (result) {
        finished = true
        this.props.console.success('Ano to je spravne.')
      }
      else {
        this.props.console.error('Bohuzel, je tam nekde chybka')
        finished = false
      }
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
            value={this.state.task.progress}
            onChange={(text) => { this.setState({ task: { ...this.state.task, progress: text } }) }}
            name="content"
            fontSize={15}
            tabSize={2}
            // editorProps={{$blockScrolling: true}}
            enableBasicAutocompletion={true}
            enableLiveAutocompletion={true}
            enableSnippets={true}
            height={'100%'}
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
