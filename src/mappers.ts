import { get } from 'lodash';
import { IEntity } from './types';

export const Genre = (item?: any): IEntity.Genre => ({
  id: get(item, '_id'),
  name: get(item, 'name') || ''
});

export const Movie = (item?: any): IEntity.Movie => ({
  id: get(item, '_id') || '',
  title: get(item, 'title') || '',
  genre: Genre(get(item, 'genre') || {}),
  stock: get(item, 'numberInStock') || 0,
  rate: get(item, 'dailyRentalRate') || 0,
  owner: get(item, 'owner') || ''
});

export const User = (item?: any): IEntity.User => ({
  id: get(item, '_id') || '',
  name: get(item, 'name') || '',
  email: get(item, 'email' || '')
});
