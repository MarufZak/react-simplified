import React from "@marufzak/react";
import { Avatar, Divider } from "@marufzak/strapi-ui";
import {
  SquareLeafIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@marufzak/strapi-ui/icons";
import { StrapiIcon } from "@marufzak/strapi-ui/icons/logos";
import { cn } from "@marufzak/strapi-ui/utils";
import type { User } from "../App";
import {
  generalPages,
  pluginsPages,
  type GeneralPageType,
  type PluginPageType,
} from "../lib/constants";

export type PathType = GeneralPageType | PluginPageType | "Content";
interface SidebarProps {
  isCollapsed: boolean;
  handleCollapseChange: () => void;
  user: User | null;
  activePath: PathType;
  onPathChange: (newPath: PathType) => void;
}

const Sidebar = ({
  isCollapsed,
  handleCollapseChange,
  activePath,
  user,
  onPathChange,
}: SidebarProps) => {
  return (
    <nav
      className={cn(
        "px-3 border-r border-neutral-150 h-screen flex flex-col bg-neutral-0",
        isCollapsed ? "w-16" : "w-[225px]",
      )}
      experimental__patching={true}
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
            {user ? user.username : "Strapi Website"}
          </h2>
          <p className="text-xs text-neutral-600 leading-none">Workplace</p>
        </div>
      </header>
      <Divider key="divider-1" className="-mx-3" />
      <div className="grow py-3">
        <ListItem
          onClick={() => onPathChange("Content")}
          isActive={activePath === "Content"}
          isCollapsed={isCollapsed}
          href="hi"
          icon={SquareLeafIcon}
        >
          Content
        </ListItem>
        <Divider
          key="divider-2"
          className={isCollapsed ? "block my-4" : "hidden"}
        />
        <ListTitle key="title-1" className={isCollapsed ? "hidden" : ""}>
          plugins
        </ListTitle>
        {pluginsPages.map((plugin) => {
          return (
            <ListItem
              onClick={() => onPathChange(plugin.title)}
              isActive={activePath === plugin.title}
              key={plugin.id}
              isCollapsed={isCollapsed}
              icon={plugin.icon}
              href={plugin.href}
            >
              {plugin.title}
            </ListItem>
          );
        })}
        <ListTitle key="title-2" className={isCollapsed ? "hidden" : ""}>
          general
        </ListTitle>
        <Divider
          key="divider-3"
          className={isCollapsed ? "block my-4" : "hidden"}
        />
        {generalPages.map((item) => {
          return (
            <ListItem
              onClick={() => onPathChange(item.title)}
              isActive={activePath === item.title}
              key={item.id}
              isCollapsed={isCollapsed}
              icon={item.icon}
              href={item.href}
            >
              {item.title}
            </ListItem>
          );
        })}
      </div>
      <Divider key="divider-4" className="-mx-3" />
      <footer
        experimental__patching={true}
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
          experimental__patching={true}
          onClick={handleCollapseChange}
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

interface ListItemProps extends React.ComponentProps<"li"> {
  icon: React.ElementType;
  href: string;
  isCollapsed: boolean;
  isActive: boolean;
}

const ListItem = ({
  icon: IconComponent,
  href,
  children,
  isCollapsed,
  isActive,
  ...props
}: ListItemProps) => {
  return (
    <li
      className={cn(
        "flex items-center gap-2 px-3 py-2 relative text-sm",
        isCollapsed ? "mb-2" : "",
        isActive ? "text-primary-600 bg-primary-100" : "",
      )}
      {...props}
    >
      <IconComponent
        width={16}
        height={16}
        className={cn(isActive ? "fill-primary-500" : "fill-neutral-500")}
      />
      <div className={isCollapsed ? "hidden" : ""}>{children}</div>
      <p className="absolute inset-0" />
    </li>
  );
};

interface ListTitleProps extends React.ComponentProps<"h2"> {}

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
