export type UserAuth = {
  id: number;
  name: string;
  email: string;
};

export type Authtoken = {
  user: {
    auth: {
      accessToken: string;
      refreshToken: string;
    };
  };
};
