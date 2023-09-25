import * as Mappers from '../mappers';
import { IForm } from '../types';
const baseURL = 'http://localhost:4000/api';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCICJ9.eyJfaWQiOiI2NTBiYzRiMjljMWQ0ODRkMjU2Y2QwMTUiLCJuYW1lIjoiYXJzbG9uYmVrWFgiLCJlbWFpbCI6ImFyc0Bkb21haW4uY29tIiwiaWF0IjoxNjk1MjcwNjM2fQ.Q3rrZgDWdbgOLM8meKhaQEQ2_VNfTHjwXoGT1VzYcfs';

export async function List() {
  const res = await fetch(`${baseURL}/genres`);
  const data = (await res.json()) as any[];
  const genres = data.map(Mappers.Genre);

  return genres;
}

export async function Single(genreId: string) {
  const res = await fetch(`${baseURL}/genres/${genreId}`);
  const data = await res.json();
  const genre = Mappers.Genre(data);

  return genre;
}

export async function Create({ name }: IForm.Genre.Create) {
  const body = JSON.stringify({ name });

  const res = await fetch(`${baseURL}/genres`, {
    method: 'POST',
    body,
    headers: { 'Content-Type': 'application/json', 'x-auth-token': TOKEN }
  });

  const data = await res.json();
  const genre = Mappers.Genre(data);

  return genre;
}
