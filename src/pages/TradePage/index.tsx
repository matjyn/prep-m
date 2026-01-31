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

    const price = selectedAsset.current_price;
    const isC2F = isCryptoToFiat;
    const input = isC2F ? cryptoAmount : fiatAmount;
    const parsed = parseFloat(input);
    const invalid = !input || Number.isNaN(parsed) || (!isC2F && price === 0);

    if (invalid) {
      isC2F ? setFiatAmount("") : setCryptoAmount("");
      return;
    }

    const result = isC2F ? parsed * price : parsed / price;
    isC2F ? setFiatAmount(result.toString()) : setCryptoAmount(result.toString());
  }, [cryptoAmount, fiatAmount, selectedAsset, isCryptoToFiat]);

  const renderCryptoInput = useCallback(
    (options: { isDisabled: boolean; value: string; onValueChange?: (val: string) => void }) => (
      <InputWithSelectModal
        label="Crypto Amount"
        value={options.value}
        onValueChange={options.onValueChange}
        children={
          <AssetsList
            assets={assets}
            onClick={setSelectedAssetId}
          />
        }
        selectedItemName={selectedAsset?.name}
        isLoading={isPending}
        isInputDisabled={options.isDisabled}
      />
    ),
    [assets, selectedAsset?.name, isPending],
  );

  const renderFiatInput = useCallback(
    (options: {
      isDisabled: boolean;
      value: string;
      onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }) => (
      <Input
        type="number"
        placeholder="Fiat Amount (USD)"
        min="0"
        value={options.value}
        onChange={options.onChange}
        disabled={options.isDisabled}
        className="animateIn"
      />
    ),
    [],
  );

  const firstInput = isCryptoToFiat
    ? renderCryptoInput({
        isDisabled: false,
        value: cryptoAmount,
        onValueChange: handleCryptoChange,
      })
    : renderFiatInput({
        isDisabled: false,
        value: fiatAmount,
        onChange: (e) => handleFiatChange(e.target.value),
      });

  const secondInput = isCryptoToFiat
    ? renderFiatInput({ isDisabled: true, value: (parseFloat(fiatAmount) || 0).toFixed(2) })
    : renderCryptoInput({ isDisabled: true, value: (parseFloat(cryptoAmount) || 0).toFixed(2) });

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
