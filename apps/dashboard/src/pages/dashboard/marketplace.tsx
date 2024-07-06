import React from "@marufzak/react";
import {
  Button,
  Divider,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SearchBar,
} from "@marufzak/strapi-ui";
import {
  CircleCheckIcon,
  CopyIcon,
  DownloadIcon,
  ExternalLinkIcon,
  StarIcon,
  StrapiPatternIcon,
  UploadIcon,
  VerifiedIcon,
  WarningIcon,
} from "@marufzak/strapi-ui/icons";
import { marketplaceItems } from "../../lib/constants";
import { GithubIcon } from "@marufzak/strapi-ui/icons/logos";
import { formatNumber } from "../../lib/utils";

const Marketplace = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredItems = marketplaceItems.filter((item) => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  console.log({ filteredItems });

  return (
    <div experimental__patching={true}>
      <header className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-[32px] leading-10 font-bold text-neutral-800">
            Strapi Market
          </h2>
          <p className="text-neutral-600">Get more out of Strapi</p>
        </div>
        <Button
          type="submit"
          size="md"
          className="flex items-center gap-2"
          theme="default"
          variant="tertiary"
          onClick={() => setIsDialogOpen(true)}
        >
          <UploadIcon width={10} height={12} className="fill-neutral-800" />
          Submit yours
        </Button>
      </header>
      <div experimental__patching={true} className="flex justify-end">
        <SearchBar
          value={searchQuery}
          onInput={(e: Event) => {
            const target = e.target as HTMLInputElement;
            setSearchQuery(target.value);
          }}
          placeholder="Search for an entry"
        />
      </div>
      <Divider className="mt-2 mb-4" />
      <div className="grid grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          return <Card key={item.id} {...item} />;
        })}
        {filteredItems.length === 0 ? (
          <div className="col-span-3 flex items-center justify-center">
            <p className="text-neutral-600 text-center">No items found</p>
          </div>
        ) : null}
      </div>
      <Modal experimental__patching={true} open={isDialogOpen}>
        <ModalHeader>
          <h3 className="font-bold text-neutral-800 text-center">Error</h3>
        </ModalHeader>
        <ModalContent className="flex flex-col items-center">
          <WarningIcon
            className="fill-danger-600 mb-2"
            width={24}
            height={24}
          />
          <p className="text-danger-600 text-center text-sm">
            Sorry, this feature is not available yet.
          </p>
        </ModalContent>
        <ModalFooter>
          <Button
            className="w-full"
            size="lg"
            key={`button-done`}
            variant="secondary"
            theme="danger"
            onClick={() => setIsDialogOpen(false)}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

interface CardProps {
  id: number;
  name: string;
  description: string;
  githubStars: number;
  forks: number;
  installCommand: string;
  url: string;
}

const Card = ({
  description,
  forks,
  githubStars,
  installCommand,
  name,
  url,
}: CardProps) => {
  const [isCopied, setIsCopied] = React.useState(false);

  React.useEffect(() => {
    if (!isCopied) {
      return;
    }

    const timeout = setTimeout(() => {
      console.log("timeout");

      setIsCopied(false);
      React.flushStateUpdates();
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isCopied]);

  const handleCopy = () => {
    if (isCopied) {
      return;
    }

    navigator.clipboard.writeText(installCommand);
    setIsCopied(true);
  };

  return (
    <article
      experimental__patching={true}
      className="p-4 bg-neutral-0 border-[0.5px] border-neutral-150 shadow-sm rounded-[4px] flex flex-col"
    >
      <header
        experimental__patching={true}
        className="flex items-start justify-between"
      >
        <StrapiPatternIcon width={64} height={64} />
        <div className="flex items-center gap-1 text-xs text-neutral-800">
          <GithubIcon className="dark:fill-neutral-50" width={12} height={12} />
          <StarIcon width={12} height={12} className="fill-warning-500" />
          <span>{formatNumber(githubStars)}</span>
          <Divider className="w-[1px] h-3 mx-3" />
          <DownloadIcon
            width={10}
            height={10}
            className="dark:fill-neutral-50"
          />
          <span>{formatNumber(forks)}</span>
        </div>
      </header>
      <div className="grow">
        <h3
          experimental__patching={true}
          className="text-lg font-medium mt-4 text-neutral-900 flex items-center gap-1 mb-2"
        >
          {name}
          <VerifiedIcon className="fill-success-600" width={19} height={24} />
        </h3>
        <p className="text-sm text-neutral-600 mb-8">{description}</p>
      </div>
      <footer experimental__patching={true} className="flex justify-end gap-2">
        <a target="_blank" href={url}>
          <Button
            key={"more-button"}
            tabIndex={-1}
            variant="tertiary"
            theme="default"
            size="sm"
            className="flex gap-2 items-center text-neutral-800"
            experimental__patching={true}
          >
            <ExternalLinkIcon
              width={12}
              height={12}
              className="fill-neutral-800"
              experimental__patching={true}
            />
            More
          </Button>
        </a>
        <Button
          onClick={handleCopy}
          key={"copy-button"}
          variant="secondary"
          theme="default"
          size="sm"
          className="flex gap-2 items-center"
          experimental__patching={true}
        >
          {isCopied ? (
            <>
              <CircleCheckIcon
                className="fill-primary-600"
                width={12}
                height={12}
              />
              Successfully Copied
            </>
          ) : (
            <>
              <CopyIcon className="fill-primary-600" width={12} height={12} />
              Copy install command
            </>
          )}
        </Button>
      </footer>
    </article>
  );
};

export default Marketplace;
