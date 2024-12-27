## 💻 Application overview
Vibesnap is a social media feed application that allows users to register using Google or an email address, post updates with simple text or multimedia content such as photos and videos, and edit their profiles

## 🎨 Features
- **User Authentication**: Allows users to register and log in using Google or email.
- **Post Updates**: Users can post text updates, images, or videos.
- **Profile Editing**: Users can edit their profiles and update information.
- **Protected Routes**: Only authenticated users can access certain routes.

## ⚙️ Project Standards and Tools
**Project Standards** 
- `Eslint` - Enforces coding standards.
- `Prettier` - Ensures consistent code formatting.
- `Typescript` - for static typing 
- `Husky` - pre-commit and pre-push hooks
- `absolute imports` - to simplify module imports
- `file naming convention` - maintains consistency across the project

**Tools and Libraries**
- `Tailwind` - framework for styling
- `shadcn/ui` - Component library for pre-built UI elements
- `react-routers` - to build Single page application
- `react-toastify`- For notifications and alerts
- `react-intersection-observer`- to implements lazy loading.
- `react-webcam` - Captures images via webcam.
- `react-dropzone` - Handles multimedia(images and video) uploads
- `react-image-file-resizer` - to optimize uploaded images
- `firebase` - for authentication(google/email-based login), database(store user and post information) and storage(handle multimedia content)

## 🏗️ Project structure
```
Directory structure:
└── Bhavani-Bolloju-Vibesnap/
    ├── index.html
    └── src/
        ├── main.tsx
        ├── types.ts
        ├── App.tsx
        ├── fonts/
        ├── assets/
        ├── components/
        │   ├── welcome/
        │   ├── performance/
        │   ├── shared/
        │   ├── ui/
        │   └── posts/
        ├── lib/
        │   └── utils.ts
        ├── styles/
        │   └── index.css
        ├── firebase/
        │   ├── auth/
        │   ├── database/
        │   ├── config.ts
        │   └── storage/
        ├── hooks/
        ├── routes/
        │   └── app-routes.tsx
        ├── pages/
        ├── features/
        │   ├── auth/
        │   ├── posts/
        │   ├── user-profile/
        │   └── feed/
        └── vite-env.d.ts
```

## 💪 Challenges Faced

#### File structure and orgnization
- **Challenge**: Adding an appropriate file and folder structure for better organization of the code.
- **Solution**: created separate folders for each `feature`, along with a `component` folder for shared components. Each feature folder contains code specific to its functionality.
- **Outcomes**: This ensured clean and well organized structure, improved code readability and made code easier to write and maintain. 

#### Form reset
- **Challenge**: To eliminate duplicate code, I used a single file for both login and signup forms, allowing users to toggle between them. However, I needed to ensure that switching between forms reset the input values to avoid persisting data from one form to the other.
- **Solution**: Found that React's `key` property can reset a component’s state, refactored the form into a separate component and assigned a unique key each time the user toggled between login and signup.
- **Outcomes**: Successfully avoided duplicate code by reusing the same form component, ensuring proper state reset when switching between login and signup states.

#### Adding the protected routes 
- **Challenge**: To implement protected routes, I needed the Firebase `auth` value to determine if a user was logged in via `Google` or `email`. However, the `auth` value initially returned `null` because the logic to check user status inside a `useEffect` runs after the first render. By that time, the app routes had already made decisions based on the `null` value
- **Solution**: Delayed route rendering until the `useEffect` completed, ensuring decisions were made based on the actual `auth` value returned by `Firebase`, rather than the initial `null` value.
- **Outcomes**: Successfully rendered protected routes based on the correct user status provided by Firebase.

#### Adding post feature with multiselect
- **Challenge**: Allowing users to create posts with text, images, and videos, while providing the option to upload single or multiple media files. The process involved challenges like validating uploaded content, optimizing image files, storing them in Firebase, and redirecting users to the feed page after successful submission.
- **Solution**: Used libraries like `react-webcam`, `react-dropzone`, and `react-image-file-resizer` to enable single and multi-select media uploads. Images were optimized before being uploaded to Firebase, and the `URLs` returned by Firebase after successful `image/video` submission were used to store the post data in the database.
- **Outcomes**: Successfully implemented the `Add New Post` feature, allowing users to upload media content and create new posts.


## 🚅 Project Perfomance and Optimization Techniques
- Implemented **code splitting** and used **React Lazy** for dynamic imports, loading components only when needed.
- Compressed **Google Fonts** to the **WOFF2** format using `google-webfonts-helper` to reduce font file sizes.
- Ran `npx depcheck` to identify and remove unused dependencies, reducing the overall payload.
- Optimized images using online tools like `Squoosh` and `TinyPNG` to minimize the file sizes.
- Implemented **lazy loading** for images and videos using `React Intersection Observer`, ensuring media is loaded only when it enters the viewport.
- Used tools like **PageSpeed Insights** and **Lighthouse** to identify performance issues and optimize the application accordingly.


## 🎊 Overall experience
- Had the opportunity to work with the **Shadcn/UI** component library for the first time, and it was fantastic—easy to use and highly effective.
- Reinforced best practices like **project structure**, enforcing **absolute imports**, and adhering to **file naming conventions** inspired by the `"bulletproof-react"` project.
- Revisited the **grid layout** concept in greater depth to implement the gallery images on the welcome page.
- Enjoyed working with new tools, particularly for **image uploads** and **webcam capture**, which made the development process fun and engaging

## 💡 Future improvements
- **Likes & Comments**: Add the ability for users to like and comment on posts.
- **Dark Mode**: Implement a dark mode toggle.
- **Post Editing**: Allow users to delete or edit their own posts.
- **Testing**: Write unit and integration tests.
- **Users Follow**: Allow users to follow other users and view their posts in a detail.


## 🪜 Installation Guide
1. Clone the repository:
   ```
   git clone https://github.com/Bhavani-Bolloju/Vibesnap.git
   ```
2. Navigate into the project folder:
   ```
   cd Vibesnap
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```













------------------------------------------------------------------------------------------








