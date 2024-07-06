import {
  LayoutIcon,
  LandscapeIcon,
  ShoppingCartIcon,
  GearIcon,
} from "@marufzak/strapi-ui/icons";

export const pluginsPages = [
  {
    id: Math.random(),
    title: "Media Library",
    icon: LandscapeIcon,
    href: "media",
  },
] as const;

export const generalPages = [
  {
    id: Math.random(),
    title: "Marketplace",
    icon: ShoppingCartIcon,
    href: "cart",
  },
  {
    id: Math.random(),
    title: "Profile",
    icon: LayoutIcon,
    href: "builder",
  },
  {
    id: Math.random(),
    title: "Settings",
    icon: GearIcon,
    href: "settings",
  },
] as const;

export const marketplaceItems = [
  {
    id: Math.random(),
    name: "@marufzak/react",
    description:
      "@marufzak/react is a JavaScript library for creating user interfaces.",
    githubStars: 12,
    forks: 0,
    installCommand: "npm install @marufzak/react",
    url: "https://github.com/MarufZak/react-simplified",
  },
  {
    id: Math.random(),
    name: "react",
    description: "React is a JavaScript library for creating user interfaces.",
    githubStars: 225000,
    forks: 45900,
    installCommand: "npm install react",
    url: "https://github.com/facebook/react",
  },
  {
    id: Math.random(),
    name: "lodash",
    description: "The Lodash library exported as Node.js modules.",
    githubStars: 59200,
    forks: 7000,
    installCommand: "npm i lodash",
    url: "https://github.com/lodash/lodash",
  },
  {
    id: Math.random(),
    name: "inquirer",
    description:
      "A collection of common interactive command line user interfaces.",
    githubStars: 19700,
    forks: 1300,
    installCommand: "npm i inquirer",
    url: "https://github.com/SBoudrias/Inquirer.js",
  },
  {
    id: Math.random(),
    name: "axios",
    description: "Promise based HTTP client for the browser and node.js",
    githubStars: 105000,
    forks: 10800,
    installCommand: "npm i axios",
    url: "https://github.com/axios/axios",
  },
  {
    id: Math.random(),
    name: "tslib",
    description:
      "This is a runtime library for TypeScript that contains all of the TypeScript helper functions..",
    githubStars: 1200,
    forks: 123,
    installCommand: "npm i tslib",
    url: "https://github.com/microsoft/tslib",
  },
  {
    id: Math.random(),
    name: "chalk",
    description: "Terminal string styling done right",
    githubStars: 21600,
    forks: 850,
    installCommand: "npm i chalk",
    url: "https://github.com/chalk/chalk",
  },
  {
    id: Math.random(),
    name: "next",
    description:
      "Enables you to create full-stack web applications by extending the latest React features.",
    githubStars: 123000,
    forks: 26300,
    installCommand: "npm i next",
    url: "https://github.com/vercel/next.js",
  },
  {
    id: Math.random(),
    name: "express",
    description: "Fast, unopinionated, minimalist web framework for Node.js.",
    githubStars: 64300,
    forks: 14600,
    installCommand: "npm i express",
    url: "https://github.com/expressjs/express",
  },
] as const;

export type GeneralPageType = (typeof generalPages)[number]["title"];
export type PluginPageType = (typeof pluginsPages)[number]["title"];
