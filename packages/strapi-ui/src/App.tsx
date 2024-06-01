import React from "react-simplified";
import Alert from "./components/alert";

const App = () => {
  return (
    <div className="p-8">
      <Alert
        action={
          <button
            className="uppercase font-bold"
            onClick={() => console.log("clicked")}
          >
            Action
          </button>
        }
        theme="danger"
        title="Information alert"
        description="Alert with title and longer description, lorem ipsum dolor sit amet constrectum adipisicng lorem ipsum dolor sit amet consrectumis adipisingus."
        size="lg"
      />
    </div>
  );
};

export default App;
