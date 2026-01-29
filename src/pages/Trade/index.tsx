import React, { useState, useMemo, useEffect } from "react";
import { useQueryAssets } from "../../queries/useQueryAssets";
import { Button } from "../../components/ui/Button/Button";
import { Input } from "../../components/ui/Input/Input";
import { InputWithSelectModal } from "../../components/common/InputWithSelectModal/InputWithSelectModal";
import { AssetsList } from "./AssetsList";
import "./TradePage.styles.css";

const TradePage: React.FC = () => {
  const { data, isPending } = useQueryAssets();

  const assets = data?.pages.flat() || [];

  const [isCryptoToFiat, setIsCryptoToFiat] = useState(true);
  const [cryptoAmount, setCryptoAmount] = useState("");
  const [fiatAmount, setFiatAmount] = useState("");
  const [selectedAssetId, setSelectedAssetId] = useState<string>("");

  const selectedAsset = useMemo(
    () => assets.find((a) => a.id === selectedAssetId) || assets[0],
    [assets, selectedAssetId],
  );

  const handleCryptoChange = (val: string) => setCryptoAmount(val);
  const handleFiatChange = (val: string) => setFiatAmount(val);
  const handleSwap = () => setIsCryptoToFiat((prev) => !prev);

  useEffect(() => {
    if (!selectedAsset) return;

    if (isCryptoToFiat) {
      if (!cryptoAmount) return setFiatAmount("");
      const parsed = parseFloat(cryptoAmount);
      if (Number.isNaN(parsed)) return setFiatAmount("");
      setFiatAmount((parsed * selectedAsset.current_price).toString());
    }

    if (!isCryptoToFiat) {
      if (!fiatAmount) return setCryptoAmount("");
      const parsed = parseFloat(fiatAmount);
      if (Number.isNaN(parsed) || selectedAsset.current_price === 0) return setCryptoAmount("");
      setCryptoAmount((parsed / selectedAsset.current_price).toString());
    }
  }, [cryptoAmount, fiatAmount, selectedAsset, isCryptoToFiat]);

  return (
    <div className="animateIn exchange-page-container">
      <form className="flex flex-column gap-3 w-full">
        {isCryptoToFiat ? (
          <InputWithSelectModal
            label="Crypto Amount"
            value={cryptoAmount}
            onValueChange={handleCryptoChange}
            children={
              <AssetsList
                assets={assets}
                onClick={setSelectedAssetId}
              />
            }
            selectedItemName={selectedAsset?.name}
            isLoading={isPending}
            isInputDisabled={false}
          />
        ) : (
          <Input
            type="number"
            placeholder="Fiat Amount (USD)"
            min="0"
            value={fiatAmount}
            onChange={(e) => handleFiatChange(e.target.value)}
            disabled={false}
            className="animateIn"
          />
        )}

        <Button
          type="button"
          onClick={handleSwap}
        >
          ⇅
        </Button>

        {isCryptoToFiat ? (
          <div>
            <Input
              type="number"
              placeholder="Fiat Amount (USD)"
              min="0"
              value={(parseFloat(fiatAmount) || 0).toFixed(2)}
              onChange={undefined}
              disabled={true}
              className=" animateIn"
            />
          </div>
        ) : (
          <InputWithSelectModal
            label="Crypto Amount"
            value={(parseFloat(cryptoAmount) || 0).toFixed(2)}
            onValueChange={undefined}
            children={
              <AssetsList
                assets={assets}
                onClick={setSelectedAssetId}
              />
            }
            selectedItemName={selectedAsset.name}
            isLoading={isPending}
            isInputDisabled={true}
          />
        )}
      </form>
    </div>
  );
};

export { TradePage };
