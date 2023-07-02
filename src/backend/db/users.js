import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Harish",
    lastName: "Gupta",
    username: "harishgupta",
    password: "harishgupta123",
    bio: "",
    website: "",
    profilePic: "https://res.cloudinary.com/dkkmc7pub/image/upload/v1687433270/Twitverse/profile-pics/download_sy9imr.jpg",
    followers: [],
    following: [
      {
        "_id": "e0440a2a-649c-4b8c-921f-77c1c6bac59b",
        "firstName": "Shubham",
        "lastName": "Soni",
        "username": "shubhamsoni",
        "password": "adarshBalika123",
        "bio": "I am Adarsh Balika",
        "website": "",
        "profilePic": "https://res.cloudinary.com/dkkmc7pub/image/upload/v1686553005/Twitverse/profile-pics/man-with-beard-avatar-character-isolated-icon-free-vector_bs1bq0.jpg",
        "createdAt": "2023-06-24T16:00:41+05:30",
        "updatedAt": "2023-06-24T16:00:41+05:30",
        "followers": [],
        "following": [],
        "bookmarks": [],
        "id": "2"
      },
      {
        "_id": "7f048a93-6d74-4927-b783-e65c871e924c",
        "firstName": "Sharad",
        "lastName": "Chaudhari",
        "username": "sharadchaudhari",
        "password": "adarshBalika123",
        "profilePic": "https://res.cloudinary.com/dkkmc7pub/image/upload/v1687433270/Twitverse/profile-pics/images_rvd3bo.png",
        "createdAt": "2023-06-24T16:00:41+05:30",
        "updatedAt": "2023-06-24T16:02:30+05:30",
        "followers": [],
        "following": [],
        "bookmarks": [],
        "id": "3"
      }
    ],
    
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Shubham",
    lastName: "Soni",
    username: "shubhamsoni",
    password: "adarshBalika123",
    bio: "I am Adarsh Balika",
    website: "",    
    profilePic: "https://res.cloudinary.com/dkkmc7pub/image/upload/v1686553005/Twitverse/profile-pics/man-with-beard-avatar-character-isolated-icon-free-vector_bs1bq0.jpg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Sharad",
    lastName: "Chaudhari",
    username: "sharadchaudhari",
    password: "adarshBalika123",
    profilePic: "https://res.cloudinary.com/dkkmc7pub/image/upload/v1687433270/Twitverse/profile-pics/images_rvd3bo.png",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Sita",
    lastName: "Gayakvad",
    username: "sitagayakvad",
    password: "adarshBalika123",
    profilePic: "https://res.cloudinary.com/dkkmc7pub/image/upload/v1687433270/Twitverse/profile-pics/images_1_lfwcu1.png",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
