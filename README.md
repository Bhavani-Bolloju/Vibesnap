## Application overview
Vibesnap is a social media feed application that allows users to register using Google or an email address, post updates with simple text or multimedia content such as photos and videos, and edit their profiles

## Project Standards and Tools
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

## Project structure
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

## Challenges faced

#### File structure and orgnization
- **Challenge**: Adding an appropriate file and folder structure for better organization of the code.
- **Solution**: created separate folders for each `feature`, along with a `component` folder for shared components. Each feature folder contains code specific to its functionality.
- **Outcomes**: This ensured clean and well organized structure, improved code readability and made code easier to write and maintain. 

#### Form reset
- **Challenge**: To eliminate duplicate code, I used a single file for both login and signup forms, allowing users to toggle between them. However, I needed to ensure that switching between forms reset the input values to avoid persisting data from one form to the other.
- **Solution**: Found that React's `key` property can reset a component’s state, refactored the form into a separate component and assigned a unique key each time the user toggled between login and signup.
- **Outcomes**: Successfully avoided duplicate code by reusing the same form component, ensuring proper state reset when switching between login and signup states.

#### Firebase user auth value returning null
- **Challenge**: 
- **Solution**:
- **Outcomes**:

#### Adding post feature
- **Challenge**:
- **Solution**:
- **Outcomes**:





## Optimization techniques

## Extended features

## Exciting things about the project
























