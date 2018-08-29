import gql from 'graphql-tag'

const Queries = {
GET_TASKS: gql`
  query tasks {
    tasks {
      id
      problem
      solution
    }
  }`,
GET_USERS: gql`
  query users {
    users {
      name
      email
    }
  }`,
GET_USER_TASKS: gql`
  query userTasks {
    userTasks {
      progress
      taskId
      task {
        solution
      }
    }
  }`,
}

export default Queries;