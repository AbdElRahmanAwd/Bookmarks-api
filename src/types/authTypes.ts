export interface Register {
  username: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface GoogleAuth {
  googleId: string;
  email: string;
  username?: string;
  avatar?: string;
}

export interface Auth {
  username: string;
  email: string;
  id: string;
  accessToken: string;
}
