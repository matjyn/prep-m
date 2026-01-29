import type { Asset } from "../../../types/api/assets";

const AssetsList = ({ assets, onClick }: { assets: Asset[]; onClick: (id: string) => void }) => {
  return (
    <>
      {assets.map((item) => (
        <li
          key={item.id}
          className="item-list-item flex align-center p-2 cursor-pointer hover:bg-gray-100"
          onClick={() => onClick(item.id)}
        >
          {item.image && (
            <img
              src={item.image}
              alt={item.name}
              className="w-5 h-5 mr-3"
            />
          )}
          <div>
            <div className="item-name font-bold">{item.name}</div>
            <div className="item-price text-sm text-muted">
              {item.current_price ? "$" + item.current_price.toFixed(2) : "Price not available"}
            </div>
          </div>
        </li>
      ))}
    </>
  );
};

export { AssetsList };
