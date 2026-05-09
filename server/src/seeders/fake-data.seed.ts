// src/seeder/fake-data.seed.ts

import axios from 'axios';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

// -----------------------------------
// CONFIG
// -----------------------------------

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';

// -----------------------------------
// DATA
// -----------------------------------

const cuisinesList = [
  'Italian',
  'Indian',
  'Japanese',
  'Mexican',
  'Chinese',
  'Thai',
  'American',
  'French',
  'Turkish',
  'Korean',
];

const menuItemsList = [
  'Pizza',
  'Burger',
  'Pasta',
  'Sushi',
  'Biryani',
  'Noodles',
  'Steak',
  'Salad',
  'Ramen',
  'Tacos',
  'Fried Chicken',
  'Soup',
  'Ice Cream',
  'Sandwich',
  'Coffee',
];

// -----------------------------------
// GENERATE MENU ITEMS
// -----------------------------------

const generateMenuItems = () => {
  return Array.from({
    length: faker.number.int({
      min: 4,
      max: 10,
    }),
  }).map(() => ({
    _id: new mongoose.Types.ObjectId(),

    name: faker.helpers.arrayElement(menuItemsList),

    price: faker.number.int({
      min: 5,
      max: 50,
    }),
  }));
};

// -----------------------------------
// GENERATE USER
// -----------------------------------

const generateUser = () => {
  const firstName = faker.person.firstName().toLowerCase();
  const lastName = faker.person.lastName().toLowerCase();

  return {
    auth0Id: `auth0|${faker.string.uuid()}`,

    name: `${firstName} ${lastName}`,

    email: `${firstName}.${lastName}${faker.number.int({
      min: 1,
      max: 999,
    })}@gmail.com`,

    addressLine1: faker.location.streetAddress(),

    city: faker.location.city(),

    country: faker.location.country(),

    imageUrl: faker.image.avatar(),
  };
};

// -----------------------------------
// GENERATE RESTAURANT
// -----------------------------------

const generateRestaurant = (userId: string) => {
  return {
    name: faker.company.name(),

    city: faker.location.city(),

    country: faker.location.country(),

    deliveryPrice: faker.number.int({
      min: 2,
      max: 10,
    }),

    estimatedDeliveryTime: faker.number.int({
      min: 15,
      max: 60,
    }),

    cuisines: faker.helpers.arrayElements(cuisinesList, {
      min: 1,
      max: 3,
    }),

    menuItems: generateMenuItems(),

    imgUrl: faker.image.urlLoremFlickr({
      category: 'restaurant',
      width: 800,
      height: 600,
    }),

    lastUpdated: new Date(),

    user: userId,
  };
};

// -----------------------------------
// SEEDER
// -----------------------------------

const seedFakeData = async () => {
  try {
    console.log('🚀 Starting fake data seeding...\n');

    for (let i = 0; i < 20; i++) {
      // -----------------------------------
      // CREATE USER
      // -----------------------------------

      const fakeUser = generateUser();

      const userResponse = await axios.post(
        `${API_BASE_URL}/user/create/fake`,
        fakeUser,
      );

      const createdUser = userResponse.data;

      console.log(`✅ User Created: ${createdUser.email}`);

      // -----------------------------------
      // CREATE RESTAURANT
      // -----------------------------------

      const restaurantData = generateRestaurant(createdUser._id);

      await axios.post(`${API_BASE_URL}/my-restaurant/fake`, restaurantData);

      console.log(`🍔 Restaurant Created For: ${createdUser.email}\n`);
    }

    console.log('🎉 Fake Data Seeded Successfully');
  } catch (error: any) {
    console.error('❌ Seeder Error:', error?.response?.data || error.message);
  }
};

seedFakeData();
