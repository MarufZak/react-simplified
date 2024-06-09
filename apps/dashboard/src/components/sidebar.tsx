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
  ChevronLeftIcon,
  ChevronRightIcon,
} from "strapi-ui/icons";
import { StrapiIcon } from "strapi-ui/icons/logos";
import { cn } from "strapi-ui/utils";

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

interface SidebarProps {
  isCollapsed: boolean;
  handleCollapseChange: (value: boolean) => void;
}

const Sidebar = ({ isCollapsed, handleCollapseChange }: SidebarProps) => {
  return (
    <nav
      className={cn(
        "px-3 border-r border-neutral-150 h-screen flex flex-col bg-neutral-0",
        isCollapsed ? "w-16" : "w-[225px]",
      )}
    >
      <header className="py-5 flex items-center gap-2">
        <div
          className={cn(
            "rounded-[4px] bg-primary-600 grid place-items-center",
            isCollapsed ? "w-10 h-10" : "w-8 h-8",
          )}
        >
          <StrapiIcon
            className="fill-neutral-0"
            width={isCollapsed ? 20 : 16}
            height={isCollapsed ? 20 : 16}
          />
        </div>
        <div className={isCollapsed ? "hidden" : ""}>
          <h2 className="text-sm font-bold mb-0.5 text-neutral-800 leading-none">
            Strapi Website
          </h2>
          <p className="text-xs text-neutral-600 leading-none">Workplace</p>
        </div>
      </header>
      <Divider className="-mx-3" />
      <div className="grow py-3">
        <ListItem isCollapsed={isCollapsed} href="hi" icon={SquareLeafIcon}>
          Content
        </ListItem>
        <Divider className={isCollapsed ? "block my-4" : "hidden"} />
        <ListTitle className={isCollapsed ? "hidden" : ""}>plugins</ListTitle>
        {plugins.map((plugin) => {
          return (
            <ListItem
              isCollapsed={isCollapsed}
              icon={plugin.icon}
              href={plugin.href}
            >
              {plugin.title}
            </ListItem>
          );
        })}
        <ListTitle className={isCollapsed ? "hidden" : ""}>general</ListTitle>
        <Divider className={isCollapsed ? "block my-4" : "hidden"} />
        {general.map((item) => {
          return (
            <ListItem
              isCollapsed={isCollapsed}
              icon={item.icon}
              href={item.href}
            >
              {item.title}
            </ListItem>
          );
        })}
      </div>
      <Divider className="-mx-3" />
      <footer
        className={cn(
          "px-3 py-5 relative",
          isCollapsed ? "px-0 flex justify-center" : "",
        )}
      >
        <div className="flex items-center gap-2">
          <Avatar src="" fallback="Kai" />
          <p
            className={cn(
              "text-neutral-600 text-sm",
              isCollapsed ? "hidden" : "",
            )}
          >
            Kai Doe
          </p>
        </div>
        <button
          onClick={() => handleCollapseChange(!isCollapsed)}
          className={cn(
            "w-[18px] h-[25px] rounded-sm border border-neutral-150 grid place-items-center absolute top-1/2 -translate-y-1/2 z-10 bg-neutral-0",
            isCollapsed ? "-right-1/2" : "right-7",
          )}
        >
          {isCollapsed ? (
            <ChevronRightIcon
              className="fill-neutral-600"
              width={6}
              height={9}
            />
          ) : (
            <ChevronLeftIcon
              className="fill-neutral-600"
              width={6}
              height={9}
            />
          )}
        </button>
      </footer>
    </nav>
  );
};

interface ListItemProps extends ReactTypes.ComponentProps<"li"> {
  icon: ReactTypes.ElementType;
  href: string;
  isCollapsed: boolean;
}

const ListItem = ({
  icon: IconComponent,
  href,
  children,
  isCollapsed,
}: ListItemProps) => {
  return (
    <li
      className={cn(
        "flex items-center gap-2 px-3 py-2 relative text-sm",
        isCollapsed ? "mb-2" : "",
      )}
    >
      <IconComponent width={16} height={16} className="fill-neutral-500" />
      <div className={isCollapsed ? "hidden" : ""}>{children}</div>
      <a className="absolute inset-0" href={href} />
    </li>
  );
};

interface ListTitleProps extends ReactTypes.ComponentProps<"h2"> {}

const ListTitle = ({ children, className, ...props }: ListTitleProps) => {
  return (
    <h2
      className={cn(
        "py-1 px-3 uppercase text-xs text-neutral-600 mt-4 mb-2 font-bold",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
};

export default Sidebar;
