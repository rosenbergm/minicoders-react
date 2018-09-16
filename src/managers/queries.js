import gql from 'graphql-tag'

const Queries = {
GET_USERS: gql`
  query users {
    users {
      name
      email
    }
  }`,
GET_USER: gql`
  query user {
    user {
      name
      email
    }
  }`,
GET_USER_TASKS: gql`
  query userTasks ($data: UserTasksFilterInput!) {
    userTasks (data: $data) {
      taskId
      userTaskId
      progress
      title
      problem
      solution
      test
      finished
      canvas
      default
      category
    }
  }`,
}

export default Queries;
