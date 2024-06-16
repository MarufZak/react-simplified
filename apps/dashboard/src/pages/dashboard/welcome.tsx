import React from "@marufzak/react";
import {
  ArrowRightIcon,
  CodeIcon,
  ExternalLinkIcon,
  InfoIcon,
  LeafIcon,
  PlayIcon,
  QuestionMarkIcon,
} from "@marufzak/strapi-ui/icons";
import {
  DiscordIcon,
  DiscourseIcon,
  GithubIcon,
  MediumIcon,
  RedditIcon,
  StrapiIcon,
  TwitterIcon,
} from "@marufzak/strapi-ui/icons/logos";
import { cn } from "@marufzak/strapi-ui/utils";

const items = [
  {
    id: Math.random(),
    icon: InfoIcon,
    iconBg: "bg-primary-600",
    iconWrapperBg: "bg-primary-100",
    title: "Read the documentation",
    description: "Discover the concepts, reference, guides and tutorials.",
  },
  {
    id: Math.random(),
    icon: CodeIcon,
    iconBg: "bg-warning-600",
    iconWrapperBg: "bg-warning-100",
    title: "Code example",
    description: "Learn by testing real project developed by the community",
  },
  {
    id: Math.random(),
    icon: PlayIcon,
    iconBg: "bg-secondary-500",
    iconWrapperBg: "bg-secondary-100",
    title: "Tutorial",
    description: "Discover the concepts, reference, guides and tutorials.",
  },
  {
    id: Math.random(),
    icon: LeafIcon,
    iconBg: "bg-alternative-600",
    iconWrapperBg: "bg-alternative-100",
    title: "Blog",
    description: "Discover the concepts, reference, guides and tutorials.",
  },
];

const media = [
  {
    id: Math.random(),
    title: "Github",
    icon: GithubIcon,
    iconFill: "fill-neutral-900",
  },
  {
    id: Math.random(),
    title: "Reddit",
    icon: RedditIcon,
    iconFill: "fill-[#FF4500]",
  },
  {
    id: Math.random(),
    title: "Medium",
    icon: MediumIcon,
    iconFill: "fill-neutral-900",
  },
  {
    id: Math.random(),
    title: "Discord",
    icon: DiscordIcon,
    iconFill: "fill-[#7289DA]",
  },
  {
    id: Math.random(),
    title: "Twitter",
    icon: TwitterIcon,
    iconFill: "fill-[#1DA1F2]",
  },
  {
    id: Math.random(),
    title: "Discourse",
    icon: DiscourseIcon,
    iconFill: "fill-neutral-900",
  },
];

const Welcome = () => {
  return (
    <section className="grid grid-cols-[2fr_1fr] gap-6 items-start">
      <StrapiIcon
        width={150}
        height={150}
        className="fill-primary-100 absolute right-0 top-0"
      />
      <div className="flex flex-col items-start mb-14 pl-6">
        <h2 className="font-bold text-[32px] leading-10 mb-3.5 text-neutral-900">
          Welcome 👋
        </h2>
        <p className="text-neutral-600 mb-6">
          We hope you are making good progress on your project! Feel free to
          read the latest news about Strapi. We are giving our best to improve
          the product based on your feedback.
        </p>
        <a
          className="text-sm flex items-center gap-2 text-primary-600"
          href="/"
        >
          See more on the blog
          <ExternalLinkIcon
            width={10}
            height={10}
            className="fill-primary-600"
          />
        </a>
      </div>
      <div className="flex flex-col gap-4 col-start-1 col-end-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <article className="bg-neutral-0 border-[0.5px] border-neutral-150 shadow-sm p-6 rounded-[4px] flex items-center gap-6">
              <div
                className={cn(
                  "w-14 h-14 rounded-[4px] grid place-items-center",
                  item.iconWrapperBg,
                )}
                role="presentation"
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-[4px] grid place-items-center",
                    item.iconBg,
                  )}
                >
                  <Icon width={13} height={13} className="fill-neutral-0" />
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-[3px]">{item.title}</h3>
                <p className="text-sm text-neutral-600">{item.description}</p>
              </div>
            </article>
          );
        })}
      </div>
      <div className="p-8 border-[0.5px] border-neutral-150 shadow-sm rounded-[4px] bg-neutral-0">
        <h3 className="text-neutral-800 font-medium mb-3">
          Join the community
        </h3>
        <p className="text-neutral-500 text-sm mb-[22px] ">
          Discuss with team members, contributors and developers on different
          channels.
        </p>
        <a
          className="flex items-center gap-2 text-primary-600 text-sm w-max"
          href="/"
        >
          See our roadmap
          <ArrowRightIcon width={10} height={10} className="fill-primary-600" />
        </a>
        <ul className="grid grid-cols-2 gap-2 mt-8">
          {media.map((mediaItem) => {
            const Icon = mediaItem.icon;

            return (
              <li>
                <a
                  href="/"
                  className="py-2 px-3 hover:bg-neutral-100 rounded-[4px] flex items-center gap-2"
                >
                  <Icon width={24} height={24} className={mediaItem.iconFill} />
                  {mediaItem.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <button className="w-8 h-8 bg-primary-600 rounded-full absolute right-8 bottom-8 grid place-items-center focus-visible:ring-2 ring-primary-600 ring-offset-2">
        <QuestionMarkIcon width={11} height={19} className="fill-neutral-0" />
      </button>
    </section>
  );
};

export default Welcome;
