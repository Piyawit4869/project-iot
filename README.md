# 🌍 ROME Project

Welcome to the **ROME** project! If you haven’t figured out how to build Rome in a day, let us show you how with the **ROME platform**. 🏗️

---

## 🚀 Getting Started

To set up and run the project, follow these steps:

### 1️⃣ Set Node.js Version

Ensure you're using the correct Node.js version with:

```sh
nvm use
```

This will switch to the project's specified Node.js version.

### 2️⃣ Install Dependencies

Run the following command to install all required dependencies:

```sh
yarn install
```

### 3️⃣ Run the Development Server

Start the development server with:

```sh
yarn dev
```

This will launch the app in development mode, allowing for real-time updates.

## 🔧 Building for Production

To create a production-ready build for Next.js, use:

```sh
yarn build
```

- This command optimizes the application and outputs it to the .next/ directory.
- The build is minified, and filenames include content hashes for better caching.

## 🏎️ Start Production Server

After building, you can run the production server with:

```sh
yarn start
```

This will serve the optimized Next.js app.

## 🚀 Deployment

### **Deploying to Vercel**

Vercel is the recommended deployment platform for Next.js. If you haven't already, install the **Vercel CLI**:

```sh
npm i -g vercel
```

Then, deploy your app with:

```sh
vercel
```

This will automatically detect Next.js and deploy your project.

### **Deploying to a Custom Server**

If you're deploying on your own server, follow these steps:

1. **Build the app**

```sh
yarn build
```

2. **Run the production server**

```sh
yarn start
```

Your Next.js app will now be running in production mode.

## 🌍 Deployment Options

- **Vercel (Recommended)** - [Vercel Docs](https://vercel.com/guides/deploying-nextjs-with-vercel)
- **Docker** - Build a Docker image and run it in a container.
- **PM2 (Process Manager for Node.js)** - Use `pm2 start yarn -- start` to keep the app running.
- **AWS, DigitalOcean, Firebase Hosting** - Host it on a cloud provider.

Now your **deployment section** is properly formatted and enclosed in `""`. 🚀  
Let me know if you need any more modifications! 😊
