import gql from 'graphql-tag'

const Mutations = {
LOGIN: gql`
  mutation userLogin ($data: LoginInput!) {
    login(data: $data)
  }`,
}

export default Mutations;
