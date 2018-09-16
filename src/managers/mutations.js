import gql from 'graphql-tag'

const Mutations = {
LOGIN: gql`
  mutation userLogin ($data: LoginInput!) {
    login(data: $data) {
      token
      user {
        name
        email
      }
    }
  }`,
REGISTER: gql`
  mutation userRegister ($data: UserRegisterInput!) {
    register(data: $data) {
      token
      user {
        name
        email
      }
    }
  }`,
UPDATE_USER: gql`
  mutation userUpdate ($data: UserInput!) {
    userUpdate(data: $data) {

        name
        password

    }
  }`,
UPDATE_TASK: gql`
  mutation updateTaskProgress ($data: UserTaskInput!) {
    updateProgress (data: $data) {
      taskId
    }
  }
`,
CREATE_TASK: gql`
  mutation createTask ($data: TaskInput!) {
    createTask (data: $data) {
      title
      problem
      solution
      test
      category
      canvas
    }
  }
`
}

export default Mutations;
