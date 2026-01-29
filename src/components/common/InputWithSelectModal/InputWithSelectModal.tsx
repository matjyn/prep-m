import React, { useState, useRef, useEffect } from "react";
import { Input } from "../../ui/Input/Input";
import { Button } from "../../ui/Button/Button";
import { Dropdown } from "../../ui/Dropdown/Dropdown";
import "./InputWithSelectModal.styles.css";

interface InputWithSelectModalProps {
  label: string;
  value: string;
  onValueChange?: (val: string) => void;
  selectedItemName?: string;
  isLoading: boolean;
  readOnly?: boolean;
  isInputDisabled?: boolean;
  children: React.ReactNode;
}

const InputWithSelectModal = ({
  label,
  value,
  onValueChange,
  selectedItemName,
  isLoading,
  readOnly = false,
  isInputDisabled = false,
  children,
}: InputWithSelectModalProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null!);

  useEffect(() => {
    setDropdownOpen(false);
  }, [selectedItemName]);

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
        >
          {selectedItemName || "Select"}
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
