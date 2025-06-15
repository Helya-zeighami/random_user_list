export interface UserApiParams {
    page?: number;
    results?: number;
    gender?: string;
    nat?: string;
    seed?: string;
  }

  export interface User {
    gender: string;
    name: { title: string; first: string; last: string };
    location: {
      street: { number: number; name: string };
      city: string;
      state: string;
      country: string;
      postcode: string | number;
    };
    email: string;
    login: { uuid: string; username: string };
    phone: string;
    picture: { large: string; thumbnail: string };
    nat: string;
  }
  export interface ApiResponse {
    results: User[];
    info: { page: number; results: number; seed: string };
  }