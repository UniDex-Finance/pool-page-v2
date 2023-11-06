import { useState, useEffect, useRef } from "react";
import DropdownTrigger from "./DropdownTrigger";
import DropdownModal from "./DropdownModal";;

interface Option {
  name: string;
  value: string;
  img?: string;
}

interface Props {
  options: Option[];
  onChange?: (val: Option) => void;
  defaultValue?: Option;
  selectedOverride?: Option;
  size: "small" | "medium" | "medium-2" | "large" | "xl";
  backgroundColor?: string;
  titleStyle?: string;
  modalMargin?: string;
  showLogo?: boolean;
  preventSelection?: boolean;
}

const Dropdown = ({
  options,
  onChange,
  defaultValue,
  selectedOverride,
  size,
  backgroundColor = "",
  titleStyle = "",
  modalMargin = "ml-[20px]",
  showLogo = true,
  preventSelection = false,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue || options[0]);
  const menuRef = useRef<HTMLInputElement>(null);

  const handleChange = (val: Option) => {
    if (!preventSelection) {
      setSelected(val);
    }

    if (onChange) {
      onChange(val);
    }
  };

  useEffect(() => {
    const handleOutsideClicks = (event: any) => {
      if (
        isOpen &&
        menuRef?.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleOutsideClicks);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleOutsideClicks);
    };
  }, [isOpen]);

  useEffect(() => {
    setSelected(defaultValue || options[0]);
  }, [defaultValue, options]);

  return (
    <div className="dropdown" ref={menuRef}>
      <DropdownTrigger
        isOpen={isOpen}
        selected={selectedOverride || selected}
        onClick={() => setIsOpen(!isOpen)}
        size={size}
        backgroundColor={backgroundColor}
        titleStyle={titleStyle}
        showLogo={showLogo}
      />
      {isOpen && (
        <div className={modalMargin}>
          <DropdownModal
            options={options}
            setDropdownVisible={setIsOpen}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};

export { Dropdown };
export type { Option };
