import axios from "axios";
import { useEffect, useState } from "react";
export default function Home() {
  const [tokens, setTokens] = useState([]);
  const token = {
    method: "GET",
    url: "https://pro-api.solscan.io/v1.0/nft/collection/list_nft/c576aab1ff8357597ce12afb009df12d79c77e46df5e15b839156f6a09987d16?page=50",
    headers: {
      accept: "application/json",
      token: process.env.NEXT_PUBLIC_API_KEY,
    },
  };

  useEffect(() => {
    axios
      .request(token)
      .then(function (response) {
        setTokens(response.data.data.list_nfts);
        console.log(response.data.data.list_nfts);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
  return (
    <div className="w-full min-h-screen bg-gray-900 p-4 items-center justify-center">
      <div className="flex flex-wrap items-center justify-center">
        {tokens != 0 &&
          tokens.map((tokens, id) => (
            <div
              className="flex flex-col shadow-md shadow-sky-700 rounded-2xl border border-white/10 m-4 hover:scale-110 duration-200"
              key={id}
            >
              <img src={tokens.nft_image} className="rounded-t-2xl" />
              <div className="text-sky-500 p-4 font-bold flex items-center justify-between">
                <a>{tokens.nft_name}</a>
                <a className="flex text-fuchsia-700">
                  {tokens?.nft_address.substring(0, 5)}...
                  {tokens?.nft_address.substring(tokens.nft_address.length - 5)}
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
