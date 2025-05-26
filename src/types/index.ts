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

export type Stats = {
  id: string;
  userId: string;
  handicap: number;
  averageScore: number;
  drivingAccuracy: number;
  greensInRegulation: number;
  puttsPerRound: number;
  createdAt: number;
  updatedAt: number;
};

export type UserInfo = {
  id: string;
  name: string;
  email: string;
  emailVerified: string | null;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type FriendRequest = {
  id: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
};

export type Friendship = {
  id: string;
  user1Id: string;
  user2Id: string;
  createdAt: string;
};
