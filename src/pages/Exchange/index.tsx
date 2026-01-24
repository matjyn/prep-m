import React, { useState, useMemo, useEffect } from "react";
import { useQueryAssets } from "../../queries/useQueryAssets";
import InputWithDropdown from "./InputWithDropdown";

const TradePage: React.FC = () => {
  const { data: assets = [], isLoading } = useQueryAssets();

  const [isCryptoToFiat, setIsCryptoToFiat] = useState(true);
  const [cryptoAmount, setCryptoAmount] = useState("");
  const [fiatAmount, setFiatAmount] = useState("");
  const [selectedAssetId, setSelectedAssetId] = useState<string>("");

  const selectedAsset = useMemo(
    () => assets.find((a) => a.id === selectedAssetId) || assets[0],
    [assets, selectedAssetId],
  );

  const handleCryptoChange = (val: string) => {
    setCryptoAmount(val);
  };

  const handleFiatChange = (val: string) => {
    setFiatAmount(val);
  };

  useEffect(() => {
    if (!selectedAsset || !isCryptoToFiat) {
      return;
    }

    if (!cryptoAmount) {
      setFiatAmount("");
      return;
    }

    const parsed = parseFloat(cryptoAmount);
    if (Number.isNaN(parsed)) {
      setFiatAmount("");
      return;
    }

    setFiatAmount((parsed * selectedAsset.price).toString());
  }, [cryptoAmount, selectedAsset, isCryptoToFiat]);

  useEffect(() => {
    if (!selectedAsset || isCryptoToFiat) {
      return;
    }

    if (!fiatAmount) {
      setCryptoAmount("");
      return;
    }

    const parsed = parseFloat(fiatAmount);
    if (Number.isNaN(parsed) || selectedAsset.price === 0) {
      setCryptoAmount("");
      return;
    }

    setCryptoAmount((parsed / selectedAsset.price).toString());
  }, [fiatAmount, selectedAsset, isCryptoToFiat]);

  const handleSwap = () => {
    setIsCryptoToFiat((prev) => !prev);
  };

  return (
    <div
      style={{
        width: 400,
        margin: "2rem auto",
        padding: 24,
        border: "1px solid #303030",
        borderRadius: "16px",
      }}
      className="animateIn"
    >
      <form
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <InputWithDropdown
          label={isCryptoToFiat ? "Crypto Amount" : "Fiat Amount (USD)"}
          amount={isCryptoToFiat ? cryptoAmount : fiatAmount}
          onAmountChange={isCryptoToFiat ? handleCryptoChange : handleFiatChange}
          assets={assets}
          selectedAsset={selectedAsset}
          setSelectedAssetId={setSelectedAssetId}
          isLoading={isLoading}
        />

        <button
          type="button"
          onClick={handleSwap}
          style={{ marginBottom: 16, alignSelf: "center" }}
        >
          Swap
        </button>

        <div style={{ marginBottom: 0 }}>
          <label style={{ display: "block", marginBottom: 4 }}>
            {isCryptoToFiat ? "Fiat Amount (USD)" : "Crypto Amount"}
          </label>
          <input
            type="number"
            min="0"
            value={isCryptoToFiat ? fiatAmount : cryptoAmount}
            readOnly
            style={{ height: 80 }}
          />
        </div>
      </form>
    </div>
  );
};

export default TradePage;
