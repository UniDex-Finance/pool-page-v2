import ReactDom from "react-dom";
import { ReactNode, useEffect, useRef, useState } from "react";

import close from "../../../assets/close.svg";

type Props = {
  modalVisible: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
};

export default ({
  modalVisible,
  title,
  onClose,
  className,
  children,
}: Props) => {
  const [portal, setPortal] = useState<HTMLElement | undefined>(undefined);
  const [modalContentClassName, setModalContentClassName] = useState("");
  const modalContent = useRef(null);

  function onCloseModal() {
    if (portal) portal.style.opacity = "0";
    setTimeout(() => onClose(), 300);
  }

  useEffect(() => {
    if (modalVisible) {
      const portalTmp = document.getElementById("portal")!;
      portalTmp.style.opacity = "1";
      setPortal(portalTmp);
    }
  }, [modalVisible]);

  // handle virtual keyboard
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (
        modalContent.current &&
        window.innerHeight < (modalContent.current as HTMLElement).offsetHeight
      ) {
        setModalContentClassName("top-0 max-sm:top-0 translate-y-0");
      } else {
        setModalContentClassName("");
      }
    });
  }, []);

  if (!modalVisible) return null;

  return ReactDom.createPortal(
    <>
      {/* overlay */}
      <div
        className="bg-neutral-900 opacity-75 fixed top-0 left-0 right-0 bottom-0 z-50"
        onClick={() => onCloseModal()}
      />
      <div
        ref={modalContent}
        className={`fixed top-1/3 left-1/2 translate-x-[-50%] translate-y-[-50%] z-50
          max-sm:top-1/2 ${modalContentClassName} ${className}`}
      >
        <div className="flex justify-between text-xl">
          <div>{title}</div>
          <button className="p-4" onClick={onCloseModal}>
            <img src={close} title="" alt="" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </>,
    document.getElementById("portal")!
  );
};
