import { useState, useRef } from "react";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import { Dropdown } from "../../ui/Dropdown/Dropdown";
import "./InputWithSelectModal.styles.css";

interface SelectableItem {
  id: string;
  name: string;
  iconUrl?: string;
  price?: number;
}

interface InputWithSelectModalProps<T extends SelectableItem> {
  label: string;
  value: string;
  onValueChange?: (val: string) => void;
  items: T[];
  selectedItem?: T;
  onItemSelect?: (id: string) => void;
  isLoading: boolean;
  readOnly?: boolean;
  isInputDisabled?: boolean;
}

const InputWithSelectModal = <T extends SelectableItem>({
  label,
  value,
  onValueChange,
  items,
  selectedItem,
  onItemSelect,
  isLoading,
  readOnly = false,
  isInputDisabled = false,
}: InputWithSelectModalProps<T>) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null!);

  const handleItemSelect = (id: string) => {
    if (onItemSelect) onItemSelect(id);
    setDropdownOpen(false);
  };

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
          disabled={isLoading || readOnly || !onItemSelect}
        >
          {selectedItem ? selectedItem.name : "Select"}
        </Button>
      </div>

      <Dropdown
        anchorRef={buttonRef}
        isOpen={dropdownOpen}
        onClose={() => setDropdownOpen(false)}
      >
        <ul className="item-list m-0 p-2 bg-white border rounded shadow-lg">
          {items.map((item) => (
            <li
              key={item.id}
              className="item-list-item flex align-center p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleItemSelect(item.id)}
            >
              {item.iconUrl && (
                <img
                  src={item.iconUrl}
                  alt={item.name}
                  className="w-5 h-5 mr-3"
                />
              )}
              <div>
                <div className="item-name font-bold">{item.name}</div>
                <div className="item-price text-sm text-muted">
                  {item.price ? "$" + item.price.toFixed(2) : "Price not available"}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Dropdown>
    </div>
  );
};

export default InputWithSelectModal;
