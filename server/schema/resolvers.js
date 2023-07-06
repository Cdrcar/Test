const { AuthenticationError } = require('apollo-server-express');
const { User, Course, Comment, Resource, Tag } = require("../models");
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    getUser: async (parent, { id }) => { return await User.findById(id)},
    getUsers: async () => { return await User.find()} ,
    getCourse: async (parent, { id }) => { return await Course.findById(id) },
    getCourses: async  () => { return await  Course.find()},
    getComment: async  (parent, { id }) => { return await Comment.findById(id)},
    getComments: async  () => {return await Comment.find()},
    getResource: async  (parent, { id }) => {return await Resource.findById(id)},
    getResources: async  () => { return await Resource.find()},
    getTag: async (parent, { id }) =>{ return await Tag.findById(id)},
    getTags: async () => {return await Tag.find()},
  },
  Mutation: {
    createUser: async (parent, { name, email, password }) => {
      return await User.create({ name, email, password });
    },
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Invalid email or password");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Invalid email or password");
      }

      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, { id, name, email }) => {
      return await User.findByIdAndUpdate(id, { name, email }, { new: true });
    },
    deleteUser: async (parent, { id }) => {
      return await User.findByIdAndDelete(id);
    },
    createCourse: async (parent, { name, description }) => {
      return await Course.create({ name, description });
    },
    updateCourse: async (parent, { id, name, description }) => {
      return await Course.findByIdAndUpdate(id, { name, description }, { new: true });
    },
    deleteCourse: async (parent, { id }) => {
      return await Course.findByIdAndDelete(id);
    },
    createComment: async (parent, { user, comment, resource, course }) => {
      return await Comment.create({ user, comment, resource, course });
    },
    updateComment: async (parent, { id, user, comment, resource, course }) => {
      return await Comment.findByIdAndUpdate(id, { user, comment, resource, course }, { new: true });
    },
    deleteComment: async (parent, { id }) => {
      return await Comment.findByIdAndDelete(id);
    },
    createResource: async (parent, { name, video, text, description, link, user, course }) => {
      return await Resource.create({ name, video, text, description, link, user, course });
    },
    updateResource: async (parent, { id, name, video, text, description, link, user, course }) => {
      return await Resource.findByIdAndUpdate(id, { name, video, text, description, link, user, course }, { new: true });
    },
    deleteResource: async (parent, { id }) => {
      return await Resource.findByIdAndDelete(id);
    },
    createTag: async (parent, { name }) => {
      return await Tag.create({ name });
    },
    updateTag: async (parent, { id, name }) => {
      return await Tag.findByIdAndUpdate(id, {name }, { new: true });
    },
    deleteTag: async (parent, { id }) => {
      return await Tag.findByIdAndDelete(id);
    },
  },
  User: {
    courses: async (parent) => {
      return await Course.find({ users: parent.id });
    },
    resources: async (parent) => {
      return await Resource.find({ user: parent.id });
    },
    comments: async (parent) => {
      return await Comment.find({ user: parent.id });
    },
    tags: async () => {
      return await Tag.find();
    },
  },
  Course: {
    users: async (parent) => {
      return await User.find({ courses: parent.id });
    },
    comments: async (parent) => {
      return await Comment.find({ course: parent.id });
    },
    resources: async (parent) => {
      return await Resource.find({ course: parent.id });
    },
    tags: async () => {
      return await Tag.find();
    },
  },
  Comment: {
    user: async (parent) => {
      return await User.findById(parent.user);
    },
    resource: async (parent) => {
      return await Resource.findById(parent.resource);
    },
    course: async (parent) => {
      return await Course.findById(parent.course);
    },
  },
  Resource: {
    user: async (parent) => {
      return await User.findById(parent.user);
    },
    course: async (parent) => {
      return await Course.findById(parent.course);
    },
    comments: async (parent) => {
      return await Comment.find({ resource: parent.id });
    },
    tags: async (parent) => {
      return await Tag.find({ _id: { $in: parent.tags } });
    },
  },
  Tag: {
    courses: async (parent) => {
      return await Course.find({ tags: parent.id });
    },
    resources: async (parent) => {
      return await Resource.find({ tags: parent.id });
    },
  },
};

module.exports = resolvers;