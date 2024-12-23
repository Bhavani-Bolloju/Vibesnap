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
  profileImage?: string;

  // postDocId: string;
}

export interface PostProps {
  media: { url: string; type: string }[];
  // postDocId: string;
  text: string;
  timestamp: number;
  userId: string;
}

export interface EditProfileProps {
  bio?: string;
  name?: string;
  profileImage?: string | null | File[];

  bannerImage?: string | null | File[];
}

// export interface updateProfileProps {
//   bio?: string;
//   name?: string;
//   profileImage?: string | null;

//   bannerImage?: string | null;
// }