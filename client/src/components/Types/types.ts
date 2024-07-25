export interface UserData {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    courses?: string[];  
    subscriptions?:string[];
    __v: number;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  teacher: string;
  thumbnail:string;
  videos: string[]; // assuming videos will be an array of strings (video IDs)
  isFree: boolean;
  createdAt: string; // ISO date string
  __v: number;
}

export interface Videos {
  _id: string;
  title: string;
  description: string;
  url: string;
  course: string;
  __v: number;
}