export namespace IEntity {
  export interface Movie {
    id: string;
    title: string;
    genre: Genre;
    stock: number;
    rate: number;
    owner: string;
  }

  export interface Genre {
    id: string;
    name: string;
  }

  export interface User {
    id: string;
    name: string;
    email: string;
  }
}

export namespace IForm {
  export namespace Movie {
    export interface Create extends Pick<IEntity.Movie, 'title' | 'stock' | 'rate'> {
      genreId: string;
    }
  }

  export namespace Genre {
    export interface Create extends Pick<IEntity.Genre, 'name'> {}
  }

  export namespace Auth {
    export interface Login {
      email: string;
      password: string;
    }
    export interface Register extends Login {
      name: string;
    }
  }
}
