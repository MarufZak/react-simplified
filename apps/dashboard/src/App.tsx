import React from "@marufzak/react";
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@marufzak/strapi-ui";

const App = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        theme="success"
        variant="primary"
        size="md"
      >
        Open
      </Button>
      <Modal open={isOpen}>
        <ModalHeader>
          <h3 className="text-center font-bold">Confirmation</h3>
        </ModalHeader>
        <ModalContent className="text-center">
          <p>Someone is editing the same document than you. </p>
        </ModalContent>
        <ModalFooter className="flex gap-2">
          <Button
            onClick={() => setIsOpen(false)}
            className="w-full"
            theme="default"
            variant="primary"
          >
            Cancel
          </Button>
          <Button className="w-full" theme="success" variant="primary">
            Accept
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default App;
