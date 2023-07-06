import { Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/en';

const product = {
  name: faker.commerce.product.name,
  description: 'description',
  price: 0,
  image: 'image',
  category_id: 1,
};

const category = {
  id: 1,
  name: 'name',
  description: 'description',
};

export const categories: Array<Prisma.CategoryCreateManyInput> = [category];

export const products: Array<Prisma.ProductCreateManyInput> = [product];
