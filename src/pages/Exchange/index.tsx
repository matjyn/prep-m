import React, { useState, useMemo, useEffect } from "react";
import { useQueryAssets } from "../../queries/useQueryAssets";
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import InputWithSelectModal from "../../components/common/InputWithSelectModal/InputWithSelectModal";
import "./ExchangePage.styles.css";

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
    <div className="animateIn exchange-page-container">
      <form className="flex flex-column gap-3 w-full">
        <InputWithSelectModal
          label={isCryptoToFiat ? "Crypto Amount" : "Fiat Amount (USD)"}
          value={isCryptoToFiat ? cryptoAmount : fiatAmount}
          onValueChange={isCryptoToFiat ? handleCryptoChange : handleFiatChange}
          items={assets}
          selectedItem={selectedAsset}
          onItemSelect={setSelectedAssetId}
          isLoading={isLoading}
        />

        <Button
          type="button"
          onClick={handleSwap}
        >
          ⇅
        </Button>

        <div>
          <Input
            type="number"
            placeholder={isCryptoToFiat ? "Fiat Amount (USD)" : "Crypto Amount"}
            min="0"
            value={
              isCryptoToFiat
                ? (parseFloat(fiatAmount) || 0).toFixed(2)
                : (parseFloat(cryptoAmount) || 0).toFixed(2)
            }
            disabled={true}
            className="cursor-not-allowed"
          />
        </div>
      </form>
    </div>
  );
};

export default TradePage;
