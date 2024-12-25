export interface UserDataProps {
  authProvider: string;
  email: string;
  name: string;
  posts: string[];
  uid: string;
  userDocId: string;
  image: string;
  bio: string;
  profileImage: string | null | File[];
  bannerImage: string | null | File[];
}

export interface FeedProps {
  media: { url: string; type: string }[];
  timestamp: number;
  name: string;
  uid: string;
  text: string;
  profileImage: string | null | File[];


}



export interface EditProfileProps {
  bio?: string;
  name?: string;
  profileImage?: string | null | File[];

  bannerImage?: string | null | File[];
}

export interface UserPostsProp {
  posts: { url: string; type: string }[][] | [];
}
