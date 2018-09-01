import gql from 'graphql-tag'

const Mutations = {
LOGIN: gql`
  mutation userLogin ($data: LoginInput!) {
    login(data: $data)
  }`,
REGISTER: gql`
mutation userRegister ($data: UserRegisterInput!) {
  register(data: $data)
}`,
}

export default Mutations;
