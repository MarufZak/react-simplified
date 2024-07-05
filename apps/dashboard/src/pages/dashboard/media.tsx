import React from "@marufzak/react";
import {
  Badge,
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@marufzak/strapi-ui";
import {
  AdobeFileIcon,
  CloseIcon,
  EmptyDocumentsIcon,
  PlusIcon,
} from "@marufzak/strapi-ui/icons";
import { formatNumber, range } from "../../lib/utils";
import { cn } from "@marufzak/strapi-ui/utils";

const Media = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [assets, setAssets] = React.useState<File[]>([]);

  const handleAssetsUpload = (newUploadedAssets: File[]) => {
    const newAssets = [...assets, ...newUploadedAssets];
    setAssets(newAssets);
  };

  return (
    <section experimental__patching={true}>
      <MediaCreateModal
        isModalOpen={isModalOpen}
        onModalClose={() => setIsModalOpen(false)}
        onAssetsUpload={handleAssetsUpload}
      />
      <header className="flex items-center justify-between mb-14">
        <h2 className="text-[32px] leading-10 font-bold">Media Library</h2>
        <Button
          onClick={() => setIsModalOpen(true)}
          key="add-asset-button-1"
          type="submit"
          size="md"
          className="flex items-center gap-2"
          theme="default"
          variant="primary"
        >
          <PlusIcon
            key="plus-icon-1"
            width={12}
            height={12}
            className="fill-neutral-0"
          />
          Add new assets
        </Button>
      </header>
      {assets.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {assets.map((asset) => {
            return (
              <AssetCard
                imageClassname="h-[165px]"
                key={asset.lastModified}
                file={asset}
              />
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 relative ">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
            <EmptyDocumentsIcon
              className="fill-neutral-0"
              width={172}
              height={96}
            />
            <p className="mt-6 mb-4 font-medium text-neutral-600">
              Upload your first assets
            </p>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2"
              key="add-asset-button-2"
              variant="secondary"
              theme="default"
              size="md"
            >
              <PlusIcon
                key="plus-icon-2"
                width={12}
                height={12}
                className="fill-primary-600"
              />
              Add new assets
            </Button>
          </div>
          {range(12).map(() => {
            return (
              <div className="h-60 rounded-[4px] bg-gradient-to-t from-neutral-150 to-neutral-150/0 opacity-30" />
            );
          })}
        </div>
      )}
    </section>
  );
};

interface MediaCreateModalProps {
  isModalOpen: boolean;
  onModalClose: () => void;
  onAssetsUpload: (assets: File[]) => void;
}

const MediaCreateModal = ({
  isModalOpen,
  onModalClose,
  onAssetsUpload,
}: MediaCreateModalProps) => {
  const [files, setFiles] = React.useState<File[]>([]);

  const handleFileUpload = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    if (file) {
      const newFiles = [...files, file];
      setFiles(newFiles);
    }
  };

  const handleAssetsUpload = () => {
    onAssetsUpload(files);
    setFiles([]);
    onModalClose();
  };

  return (
    <Modal className="w-[829px]" open={isModalOpen}>
      <ModalHeader className="flex flex-row items-center justify-between bg-neutral-100">
        <h3 className="font-bold text-neutral-800 text-center">
          Add new assets
        </h3>
        <Button
          onClick={onModalClose}
          size="icon"
          theme="default"
          variant="tertiary"
        >
          <CloseIcon width={12} height={12} />
        </Button>
      </ModalHeader>
      <ModalContent className="h-[414px] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h4 className="text-xs font-bold text-neutral-800">
              1 asset ready to upload
            </h4>
            <p className="text-xs text-neutral-500">
              Manage the assets before uploading them to the Media Library
            </p>
          </div>
          <Button
            key="modal-add-btn"
            variant="primary"
            theme="default"
            size="md"
            className="relative"
            tabIndex={-1}
          >
            {/* pitfall, focus state is not visible */}
            <input
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 appearance-none cursor-pointer"
              type="file"
            />
            Add new assets
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {files.map((file) => {
            return <AssetCard key={file.lastModified} file={file} />;
          })}
        </div>
      </ModalContent>
      <ModalFooter className="flex flex-row items-center justify-between bg-neutral-100">
        <Button
          key="modal-cancel-btn"
          variant="tertiary"
          theme="default"
          size="md"
        >
          Cancel
        </Button>
        <Button
          key="modal-create-btn"
          variant="primary"
          theme="default"
          size="md"
          disabled={files.length === 0}
          onClick={handleAssetsUpload}
        >
          Upload {files.length} assets to the library
        </Button>
      </ModalFooter>
    </Modal>
  );
};

interface AssetCard extends React.ComponentProps<"article"> {
  file: File;
  imageClassname?: string;
}

const AssetCard = ({
  file,
  className,
  imageClassname,
  ...props
}: AssetCard) => {
  return (
    <article
      className={cn(
        "rounded-[4px] border-[0.5px] border-neutral-150 shadow-sm",
        className,
      )}
      {...props}
    >
      {file.type.includes("image") ? (
        <img
          className={cn("w-full h-[88px] object-cover", imageClassname)}
          src={URL.createObjectURL(file)}
          alt={file.name}
        />
      ) : (
        <div
          className={cn(
            "w-full h-[88px] grid place-items-center bg-neutral-100",
            imageClassname,
          )}
        >
          <AdobeFileIcon
            key={file.lastModified}
            width={24}
            height={32}
            className="stroke-warning-600"
          />
        </div>
      )}
      <div className="px-2 py-3">
        <div className="flex items-start justify-between">
          <h4 className="text-xs text-neutral-800 font-bold">{file.name}</h4>
          <Badge key={file.lastModified} variant="default">
            FILE
          </Badge>
        </div>
        <p className="text-xs text-neutral-500">
          <span className="uppercase">{file.type.split("/")[1]}</span> -{" "}
          {formatNumber(file.size / 1_000_000)}MB
        </p>
      </div>
    </article>
  );
};

export default Media;
