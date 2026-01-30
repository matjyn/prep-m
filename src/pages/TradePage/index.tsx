import React, { useState, useMemo, useEffect, useCallback } from "react";
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

  const renderCryptoInput = useCallback(
    (isDisabled: boolean, value: string, onValueChange?: (val: string) => void) => (
      <InputWithSelectModal
        label="Crypto Amount"
        value={value}
        onValueChange={onValueChange}
        children={
          <AssetsList
            assets={assets}
            onClick={setSelectedAssetId}
          />
        }
        selectedItemName={selectedAsset?.name}
        isLoading={isPending}
        isInputDisabled={isDisabled}
      />
    ),
    [assets, selectedAsset?.name, isPending],
  );

  const renderFiatInput = useCallback(
    (
      isDisabled: boolean,
      value: string,
      onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    ) => (
      <Input
        type="number"
        placeholder="Fiat Amount (USD)"
        min="0"
        value={value}
        onChange={onChange}
        disabled={isDisabled}
        className="animateIn"
      />
    ),
    [],
  );

  const firstInput = isCryptoToFiat
    ? renderCryptoInput(false, cryptoAmount, handleCryptoChange)
    : renderFiatInput(false, fiatAmount, (e) => handleFiatChange(e.target.value));

  const secondInput = isCryptoToFiat
    ? renderFiatInput(true, (parseFloat(fiatAmount) || 0).toFixed(2), undefined)
    : renderCryptoInput(true, (parseFloat(cryptoAmount) || 0).toFixed(2), undefined);

  return (
    <div className="animateIn exchange-page-container">
      <form className="flex flex-column gap-3 w-full">
        {firstInput}
        <Button
          type="button"
          onClick={handleSwap}
        >
          ⇅
        </Button>
        {secondInput}
      </form>
    </div>
  );
};

export { TradePage };
