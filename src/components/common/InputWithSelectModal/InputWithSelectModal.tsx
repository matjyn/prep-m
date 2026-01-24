import { useState } from "react";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import { Modal } from "../../ui/Modal/Modal";
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
}: InputWithSelectModalProps<T>) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleItemSelect = (id: string) => {
    if (onItemSelect) onItemSelect(id);
    setModalOpen(false);
  };

  return (
    <div className="input-with-select-modal">
      <Input
        type="number"
        min="0"
        placeholder={label}
        value={value}
        onChange={onValueChange ? (e) => onValueChange(e.target.value) : undefined}
        disabled={isLoading || readOnly}
        readOnly={readOnly}
      />
      <div className="select-button-container">
        <Button
          type="button"
          onClick={() => setModalOpen(true)}
          disabled={isLoading || readOnly || !onItemSelect}
        >
          {selectedItem ? selectedItem.name : "Select"}
        </Button>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <h3 className="mt-0">Select Item</h3>
        <ul className="item-list m-0 p-0">
          {items.map((item) => (
            <li
              key={item.id}
              className="item-list-item flex align-center p-2 cursor-pointer"
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
                  {item.price
                    ? item.price.toLocaleString(undefined, {
                        style: "currency",
                        currency: "USD",
                      })
                    : "Price not available"}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

export default InputWithSelectModal;
