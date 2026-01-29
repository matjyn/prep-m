import React from "react";
import { Dropdown } from "../../components/ui/Dropdown/Dropdown";

interface AssetDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement>;
}

const AssetDropdown: React.FC<AssetDropdownProps> = ({ isOpen, onClose, anchorRef }) => {
  if (!anchorRef.current) return null;

  return (
    <Dropdown
      anchorRef={anchorRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div
        className="w-full px-4 py-2 cursor-pointer"
        onClick={onClose}
      >
        Buy
      </div>
      <div
        className="w-full px-4 py-2 cursor-pointer"
        onClick={onClose}
      >
        Sell
      </div>
    </Dropdown>
  );
};

export { AssetDropdown };
