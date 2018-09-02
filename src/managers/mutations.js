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
}

export default Mutations;
