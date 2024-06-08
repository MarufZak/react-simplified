import React from "react-simplified";
import type ReactTypes from "react-simplified/types";
import { Avatar, Divider } from "strapi-ui";
import {
  SquareLeafIcon,
  LayoutIcon,
  LandscapeIcon,
  CircleInfoIcon,
  PuzzleIcon,
  ShoppingCartIcon,
  GearIcon,
} from "strapi-ui/icons";
import { StrapiIcon } from "strapi-ui/icons/logos";

const plugins = [
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
];

const general = [
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
];

const Sidebar = () => {
  return (
    <nav className="px-3 border-r border-neutral-150 min-h-screen max-w-[225px] flex flex-col">
      <header className="py-5 flex items-center gap-2">
        <div className="w-8 h-8 rounded-[4px] bg-primary-600 grid place-items-center">
          <StrapiIcon className="fill-neutral-0" width={16} height={16} />
        </div>
        <div>
          <h2 className="text-sm font-bold mb-0.5 text-neutral-800 leading-none">
            Strapi Website
          </h2>
          <p className="text-xs text-neutral-600 leading-none">Workplace</p>
        </div>
      </header>
      <Divider className="-mx-3" />
      <div className="grow py-3">
        <ListItem href="hi" icon={SquareLeafIcon}>
          Content
        </ListItem>
        <ListTitle>plugins</ListTitle>
        {plugins.map((plugin) => {
          return (
            <ListItem icon={plugin.icon} href={plugin.href}>
              {plugin.title}
            </ListItem>
          );
        })}
        <ListTitle>general</ListTitle>
        {general.map((item) => {
          return (
            <ListItem icon={item.icon} href={item.href}>
              {item.title}
            </ListItem>
          );
        })}
      </div>
      <Divider className="-mx-3" />
      <footer className="px-3 py-5">
        <div className="flex items-center gap-2">
          <Avatar src="" fallback="Kai" />
          <p className="text-neutral-600 text-sm">Kai Doe</p>
        </div>
      </footer>
    </nav>
  );
};

interface ListItemProps extends ReactTypes.ComponentProps<"li"> {
  icon: ReactTypes.ElementType;
  href: string;
}

const ListItem = ({ icon: IconComponent, href, children }: ListItemProps) => {
  return (
    <li className="flex items-center gap-2 px-3 py-2 relative text-sm">
      <IconComponent width={16} height={16} className="fill-neutral-500" />
      {children}
      <a className="absolute inset-0" href={href} />
    </li>
  );
};

interface ListTitleProps extends ReactTypes.ComponentProps<"h2"> {}

const ListTitle = ({ children }: ListTitleProps) => {
  return (
    <h2 className="py-1 px-3 uppercase text-xs text-neutral-600 mt-4 mb-2 font-bold">
      {children}
    </h2>
  );
};

export default Sidebar;
