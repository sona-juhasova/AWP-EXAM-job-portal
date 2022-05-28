import {
  mongoose
} from "mongoose";
import { boolean } from "webidl-conversions";

const {
  Schema
} = mongoose;

const students = new Schema({
  date: Date,
  name: String,
  bio: String,
  tags: Array,
  linkedin_link: String,
  website_link: String, 
  profile_img: String,
  userId: String,
  published: String,

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