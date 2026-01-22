import React, { useState } from "react";
import { Modal } from "../../components/ui/Modal/Modal";

interface Asset {
  id: string;
  name: string;
}

interface InputWithDropdownProps {
  label: string;
  amount: string;
  onAmountChange?: (val: string) => void;
  assets: Asset[];
  selectedAsset?: Asset;
  setSelectedAssetId?: (id: string) => void;
  isLoading: boolean;
  readOnly?: boolean;
}

const InputWithDropdown: React.FC<InputWithDropdownProps> = ({
  label,
  amount,
  onAmountChange,
  assets,
  selectedAsset,
  setSelectedAssetId,
  isLoading,
  readOnly = false,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleAssetSelect = (id: string) => {
    if (setSelectedAssetId) setSelectedAssetId(id);
    setModalOpen(false);
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", marginBottom: 4 }}>{label}</label>
      <div style={{ position: "relative", width: "100%" }}>
        <input
          type="number"
          min="0"
          value={amount}
          onChange={onAmountChange ? (e) => onAmountChange(e.target.value) : undefined}
          disabled={isLoading || readOnly}
          readOnly={readOnly}
        />
        <button
          type="button"
          style={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
          }}
          onClick={() => setModalOpen(true)}
          disabled={isLoading || readOnly || !setSelectedAssetId}
        >
          {selectedAsset ? selectedAsset.name : "Select"}
        </button>

        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        >
          <div style={{ padding: 16 }}>
            <h3 style={{ marginTop: 0 }}>Select Asset</h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {assets.map((asset) => (
                <li key={asset.id}>
                  <button
                    type="button"
                    onClick={() => handleAssetSelect(asset.id)}
                    style={{
                      width: "100%",
                    }}
                  >
                    {asset.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default InputWithDropdown;
