export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
};

export type Golfclub = {
  id: string;
  userId: string;
  type: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Activity = {
  id: string;
  userId: string;
  type: string;
  details: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};
