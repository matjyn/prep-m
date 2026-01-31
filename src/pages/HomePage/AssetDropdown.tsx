import React, { useState, useRef } from "react";
import { Dropdown } from "../../components/ui/Dropdown/Dropdown";
import { Button } from "../../components/ui/Button/Button";

const AssetDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button
        ref={anchorRef}
        onClick={handleToggle}
      >
        ⋮
      </Button>

      <Dropdown
        anchorRef={anchorRef}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <div
          className="w-full px-4 py-2 cursor-pointer"
          onClick={handleClose}
        >
          Buy
        </div>
        <div
          className="w-full px-4 py-2 cursor-pointer"
          onClick={handleClose}
        >
          Sell
        </div>
      </Dropdown>
    </>
  );
};

export { AssetDropdown };
