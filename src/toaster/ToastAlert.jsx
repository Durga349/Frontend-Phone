import { Toaster } from "sonner";

const ToasterAlert = () => {
  return (
    <>
      <div>
        <Toaster
          position="top-right"
          expand={false}
          closeButton
          richColors
          className="sonnerToaster"
          pauseWhenHovering
          toastOptions={{
            duration: 3000,
            classNames: {
              toast: "custom-toast",
            },
          }}
        />
      </div>
    </>
  );
};

export default ToasterAlert;
