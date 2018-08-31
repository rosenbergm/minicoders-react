import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Queries from '../managers/queries'
import { Button } from 'reactstrap'

import AceEditor from 'react-ace'
import brace from 'brace'

import 'brace/ext/language_tools';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

var first = true;
let resultBuffer = []
class SecuredComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      res: [],
      value: `let i = 2;\nconsole.log(i);`,
      console: ''
    }

    var original = window.console;
    window.console = {
        log: (args) => {
            resultBuffer.push(args);

            /*this.setState({
              console: `${this.state.console}<br /> ${resultBuffer.join('<br />')}`,
            });*/
            this.setState({
              console: `${resultBuffer.join('<br />')}`,
            });
            original.log.apply(original, [args]);
        }
        , warn: (args) => {
            // do sneaky stuff
            //this.setState({ console: `${this.state.console}<br /> <span class='warning'>${args}</span>` });
            original.warn.apply(original, [args]);
        }
        , error: (args) => {
            // do sneaky stuff
            original.error.apply(original, [args]);
            //alert(args);
            this.setState({ console: `${this.state.console}<br /> <span class='error'>${args}</span>` });
        }
    }
  }

  clearConsole() {
    this.setState({ console: '' });
    resultBuffer = []
  }

  onChange(newValue) {
    this.setState({value: newValue});
  }

  evaluate() {
    try {
      eval(this.state.value, true);
    } catch (e) {
        console.error(e);
    } finally {

    }
  }

  render() {
    return (
      <div className="App">
        <a onClick={() => this.props.logout()} href="#">Odhlasit se</a>
        <div>
          <AceEditor
            mode="javascript"
            theme="monokai"
            value={this.state.value}
            onChange={(text) => this.onChange(text)}
            name="content"
            fontSize={13}
            tabSize={2}
            editorProps={{$blockScrolling: true}}
            enableBasicAutocompletion={true}
            enableLiveAutocompletion={true}
            enableSnippets={true}
            //width={window.innerWidth/2 + 'px'}
          />
        </div>
        <Button onClick={() => this.evaluate()}>Spustit program</Button>
        <Button onClick={() => this.clearConsole()}>Vyčistit konzoli</Button>
        <div>
          <div dangerouslySetInnerHTML={{__html: this.state.console}} />
            <div style={{ float:"left", clear: "both" }}
                  ref={(el) => { this.messagesEnd = el; }}>
            </div>
        </div>
        <Query query={Queries.GET_TASKS}>
          {({ data, error, loading }) => {
            if (error) return '💩 Oops!';
            if (loading) return 'Patience, patience...';

            return (
              data.tasks.map(task => (
                <div key={task}>
                  <h2>ID: {task.id}</h2>
                  <h2>Problem: {task.problem}</h2>
                  <h2>Solution: {task.solution}</h2>
                </div>
              ))
            );
          }}
        </Query>

        <Query query={Queries.GET_USER_TASKS}>
          {({ data, error, loading }) => {
            if (error) return '💩 Oops!';
            if (loading) return 'Patience, patience...';

            return (
              data.userTasks.map(userTask => (
                <div key={userTask}>
                  <h2>Progress: {userTask.progress}</h2>
                  <h2>Task ID: {userTask.taskId}</h2>
                  <h2>Task Solution: {userTask.task.solution}</h2>
                </div>
              ))
            );
          }}
        </Query>
      </div>
    );
  }
}

export default SecuredComponent;
