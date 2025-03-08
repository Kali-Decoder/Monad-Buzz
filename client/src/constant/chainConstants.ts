import { http } from "viem";

const bleTestnetNetwork = {
  id: 52085143,
  name: "BLE Testnet",
  iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/4584.png", // Placeholder icon URL for ETH
  nativeCurrency: { name: "BLE", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://testnet.rpc.ethena.fi/"] },
  },
  blockExplorers: {
    default: {
      name: "BLE Testnet",
      url: "https://testnet.explorer.ethena.fi/",
    },
  },
};
const etherlinkTestnet = {
  id: 128123,
  name: "Etherlink Testnet",
  iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png", // Placeholder icon URL for ETH
  nativeCurrency: { name: "Etherlink", symbol: "XTZ", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://node.ghostnet.etherlink.com/"] },
  },
  blockExplorers: {
    default: { name: "Etherlink Testnet Explorer", url: "https://explorer-holesky.morphl2.io" },
  },
};
const monadTestnet = {
  id: 10143,
  name: "Monad Testnet",
  iconUrl: "https://miro.medium.com/v2/resize:fit:400/0*aRHYdVg5kllfc7Gn.jpg",
  nativeCurrency: { name: "Monad Testnet", symbol: "MON", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://testnet-rpc.monad.xyz/"] },
  },
  blockExplorers: {
    default: {
      name: "Monad Testnet",
      url: "https://monad-testnet.socialscan.io/",
    },
  },
};

export const chainArray = [bleTestnetNetwork,etherlinkTestnet,monadTestnet];
export const transportsObject = {
  [bleTestnetNetwork.id]: http(),
  [etherlinkTestnet.id]: http(),
  [monadTestnet.id]: http(),

};
