import {
  SquareLeafIcon,
  LayoutIcon,
  LandscapeIcon,
  CircleInfoIcon,
  PuzzleIcon,
  ShoppingCartIcon,
  GearIcon,
} from "@marufzak/strapi-ui/icons";

export const pluginsPages = [
  {
    id: Math.random(),
    title: "Builder",
    icon: LayoutIcon,
    href: "builder",
  },
  {
    id: Math.random(),
    title: "Media Library",
    icon: LandscapeIcon,
    href: "media",
  },
  {
    id: Math.random(),
    title: "Documentation",
    icon: CircleInfoIcon,
    href: "docs",
  },
] as const;

export const generalPages = [
  {
    id: Math.random(),
    title: "Plugins",
    icon: PuzzleIcon,
    href: "plugins",
  },
  {
    id: Math.random(),
    title: "Marketplace",
    icon: ShoppingCartIcon,
    href: "cart",
  },
  {
    id: Math.random(),
    title: "Settings",
    icon: GearIcon,
    href: "settings",
  },
] as const;

export type GeneralPageType = (typeof generalPages)[number]["title"];
export type PluginPageType = (typeof pluginsPages)[number]["title"];
