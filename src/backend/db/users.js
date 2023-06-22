import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    bio: "I am Adarsh Balika",
    website: "https://adarshbalika.com",
    profilePic: "https://res.cloudinary.com/dkkmc7pub/image/upload/v1686553005/Twitverse/profile-pics/depositphotos_131750410-stock-illustration-woman-female-avatar-character_fio5tu.webp",
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
