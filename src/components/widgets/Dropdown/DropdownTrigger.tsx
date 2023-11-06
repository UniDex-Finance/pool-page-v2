import { useState } from 'react';
import arrowSelectorWhite from '../../../assets/arrow-selector-white.svg';
import { Option } from '.';

interface Props {
  isOpen: boolean;
  onClick: () => void;
  selected: Option;
  size: 'small' | 'medium' | 'medium-2' | 'large' | 'xl';
  backgroundColor: string;
  titleStyle: string;
  showLogo: boolean;
}

export default function DropdownTrigger({
  isOpen,
  onClick,
  selected,
  size,
  backgroundColor,
  titleStyle = 'title',
  showLogo = true,
}: Props) {
  const [arrowSelector, setArrowSelector] = useState(arrowSelectorWhite);

  return (
    <div
      className={`dropdown-trigger flex flex-row flex-start text-xl min-w-[120px] rounded-lg text-center 
       ${size === 'small' && 'w-[120px] justify-center'}
       ${size === 'medium' && 'w-[210px] px-2 py-2 justify-center'}
       ${size === 'medium-2' && 'w-[155px] px-2 py-2 ml--4 justify-start'}
       ${size === 'large' && 'w-[280px] items-center space-x-3 justify-center'}
       ${size === 'xl' && 'w-[350px] items-center space-x-3 mx-auto justify-center'}
       ${backgroundColor !== '' && `${backgroundColor}`}
      `}
      onClick={onClick}
      onMouseEnter={() => setArrowSelector(arrowSelectorWhite)}
      onMouseLeave={() => setArrowSelector(arrowSelectorWhite)}
    >
      {showLogo && selected.img && <img className="w-[25px] h-[25px]" src={selected.img} alt="" />}
      <div className={`${titleStyle}`}>{selected?.name}</div>
      <img
        className={`min-w-[16px] min-h-[17px] transition-transform text-[#f6f6f6] duration-300 ml-2 ${
          isOpen ? 'rotate-180' : ''
        }`}
        src={arrowSelector}
        alt=""
      />
    </div>
  );
}
