import React, { useState, useRef, useEffect } from "react";
import { Input } from "../../ui/Input/Input";
import { Button } from "../../ui/Button/Button";
import { Dropdown } from "../../ui/Dropdown/Dropdown";
import "./InputWithSelectModal.styles.css";
import type { Asset } from "../../../types/api/assets";

interface InputWithSelectModalProps {
  label: string;
  value: string;
  onValueChange?: (val: string) => void;
  selectedItem?: Asset;
  isLoading: boolean;
  readOnly?: boolean;
  isInputDisabled?: boolean;
  children: React.ReactNode;
}

const InputWithSelectModal = ({
  label,
  value,
  onValueChange,
  selectedItem,
  isLoading,
  readOnly = false,
  isInputDisabled = false,
  children,
}: InputWithSelectModalProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null!);

  useEffect(() => {
    setDropdownOpen(false);
  }, [selectedItem]);

  return (
    <div className="input-with-select-modal animateIn">
      <Input
        type="number"
        min="0"
        placeholder={label}
        value={value}
        onChange={onValueChange ? (e) => onValueChange(e.target.value) : undefined}
        disabled={isLoading || readOnly || isInputDisabled}
        readOnly={readOnly}
      />
      <div className="select-button-container">
        <Button
          ref={buttonRef}
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          disabled={isLoading || readOnly}
          className="flex align-center gap-1"
        >
          {selectedItem?.image && (
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="w-4 h-4 mr-1"
            />
          )}
          {selectedItem?.name || "Select"}
        </Button>
      </div>

      <Dropdown
        anchorRef={buttonRef}
        isOpen={dropdownOpen}
        onClose={() => setDropdownOpen(false)}
      >
        {children}
      </Dropdown>
    </div>
  );
};

export { InputWithSelectModal };
