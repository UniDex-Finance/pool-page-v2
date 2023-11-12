import { Dispatch, SetStateAction } from 'react';
import { Option } from '.';

interface Props {
  setDropdownVisible: Dispatch<SetStateAction<boolean>>;
  onChange: (val: Option) => void;
  options: Option[];
}

export default function DropdownModal({ setDropdownVisible, onChange, options }: Props) {
  function handleOnClick(option: Option) {
    setDropdownVisible(false);
    onChange(option);
  }

  return (
    <div className="dropdown-modal absolute z-40 bg-main-front rounded-lg md:border-0 mr-2 mx-auto items-center text-center justify-center text-white border-white border-2 mt-4 p-2">
      <div className="dropdown-list-wrapper overflow-y-auto scrollbar-thin scrollbar-track-neutral-900 scrollbar-thumb-neutral-600 hover:scrollbar-thumb-[#676767]">
        {options.map((option) => (
          <div
            key={option.value}
            className="flex justify-start items-center px-3 py-3 select-none hover:bg-gray-800 hover:cursor-pointer w-auto min-w-[135px]"
            onClick={() => handleOnClick(option)}
          >
            {option.img && <img className="w-[25px] h-[25px] mr-3" src={option.img} alt="" />}
            <div className="option">{option.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
