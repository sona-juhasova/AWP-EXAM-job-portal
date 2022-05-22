import {
  mongoose
} from "mongoose";

const {
  Schema
} = mongoose;

const students = new Schema({
  date: Date,
  bio: String,
  tags: Array,
  linkedin_link: String,
  website_link: String,
  favourite: Boolean,


});

const companies = new Schema({
  favourite: Array,


});

const users = new Schema({
  username: {
    type: String,
    required: true,
    minLength: [3, "That's too short"],
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [3, "That's too short"],
  },

  createdAt: {
    type: Date,
    required: false,
  },
  updatedAt: {
    type: Date,
    required: false,
  },

  user_type: {
    type: String,
    required: true,
  },
});

export const models = [{
    name: "Students",
    schema: students,
    collection: "students",
  },
  {
    name: "Companies",
    schema: companies,
    collection: "companies",
  },
  {
    name: "Users",
    schema: users,
    collection: "users",
  },
];