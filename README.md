This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Install all the packages

npm install

## Generate build of the project

npm run build

## Start server

npm run dev After running npm run dev command server will start at http://localhost:3000

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Folder Structure
```
.
└── src
    ├──app
        ├──page.tsx # root page
        ├──home
            ├──page.tsx # home page
    ├── components # Contains all common components
    ├── assets # Contains images, animations, and fonts
    ├── config # Contains API configuration files
    ├── constants # Contains constants like image imports
    ├── interfaces # Contains all interfaces for the project
    └── services # Contains custom components for API requests (GET, POST, PUT, DELETE)
```