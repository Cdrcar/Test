import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation createUser(
    $firstName: String
    $lastName: String
    $email: String!
    $password: String!
    $username: String
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      username: $username
    ) {
      token
      user {
        email
        firstName
        lastName
        password
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        username
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $firstName: String
    $lastName: String
    $email: String
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
    ) {
      _id
      firstName
      lastName
      username
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      _id
      firstName
      lastName
      username
      email
    }
  }
`;

export const CREATE_COURSE = gql`
  mutation createCourse($name: String!, $description: String!) {
    createCourse(name: $name, description: $description) {
      _id
      name
      description
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation updateCourse($id: ID!, $name: String, $description: String) {
    updateCourse(id: $id, name: $name, description: $description) {
      _id
      name
      description
    }
  }
`;

export const DELETE_COURSE = gql`
  mutation deleteCourse($id: ID!) {
    deleteCourse(id: $id) {
      _id
      name
      description
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment(
    $user: ID!
    $comment: String!
    $resource: ID!
    $course: ID!
  ) {
    createComment(
      user: $user
      comment: $comment
      resource: $resource
      course: $course
    ) {
      _id
      user {
        _id
        firstName
        lastName
        username
        email
      }
      comment
      resource {
        _id
        name
      }
      course {
        _id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation updateComment(
    $id: ID!
    $user: ID
    $comment: String
    $resource: ID
    $course: ID
  ) {
    updateComment(
      id: $id
      user: $user
      comment: $comment
      resource: $resource
      course: $course
    ) {
      _id
      user {
        _id
        firstName
        lastName
        username
        email
      }
      comment
      resource {
        _id
        name
      }
      course {
        _id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: ID!) {
    deleteComment(id: $id) {
      _id
      user {
        _id
        firstName
        lastName
        username
        email
      }
      comment
      resource {
        _id
        name
      }
      course {
        _id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_RESOURCE = gql`
  mutation createResource(
    $name: String!
    $video: String
    $text: String
    $description: String!
    $link: String
    $user: ID!
    $course: ID!
  ) {
    createResource(
      name: $name
      video: $video
      text: $text
      description: $description
      link: $link
      user: $user
      course: $course
    ) {
      _id
      name
      video
      text
      description
      link
      comments {
        _id
        user {
          _id
          firstName
          lastName
          username
          email
        }
        comment
      }
      user {
        _id
        firstName
        lastName
        username
        email
      }
      course {
        _id
        name
      }
      tags {
        _id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_RESOURCE = gql`
  mutation updateResource(
    $id: ID!
    $name: String
    $video: String
    $text: String
    $description: String
    $link: String
    $user: ID
    $course: ID
  ) {
    updateResource(
      id: $id
      name: $name
      video: $video
      text: $text
      description: $description
      link: $link
      user: $user
      course: $course
    ) {
      _id
      name
      video
      text
      description
      link
      comments {
        _id
        user {
          _id
          firstName
          lastName
          username
          email
        }
        comment
      }
      user {
        _id
        firstName
        lastName
        username
        email
      }
      tags {
        _id
        name
      }
      course {
        _id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_RESOURCE = gql`
  mutation deleteResource($id: ID!) {
    deleteResource(id: $id) {
      _id
      name
      video
      text
      description
      link
      comments {
        _id
        user {
          _id
          firstName
          lastName
          username
          email
        }
        comment
      }
      user {
        _id
        firstName
        lastName
        username
        email
      }
      tags {
        _id
        name
      }
      course {
        _id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_TAG = gql`
  mutation createTag($name: String) {
    createTag(name: $name) {
      _id
      name
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_TAG = gql`
  mutation updateTag($id: ID!, $name: String) {
    updateTag(id: $id, name: $name) {
      _id
      name
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_TAG = gql`
  mutation deleteTag($id: ID!) {
    deleteTag(id: $id) {
      _id
      name
      createdAt
      updatedAt
    }
  }
`;
