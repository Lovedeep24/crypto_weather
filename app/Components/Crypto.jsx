"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "@/store/slices/dataSlice";
import { Star } from "lucide-react";
export const dynamic = "force-dynamic"; 
export default function Crypto() {
  const dispatch = useDispatch();
  const { crypto, loading, webCrypto } = useSelector((state) => state.data);
  const [favorites, setFavorites] = useState({});

  // useEffect(() => {
  //   dispatch(fetchData());
  //   dispatch({ type: "data/fetchCryptoData" });
  // }, [dispatch]);

  const getPrice = (item) => {
    if (webCrypto && webCrypto[item.name.toLowerCase()]) {
      return parseFloat(webCrypto[item.name.toLowerCase()]).toFixed(2);
    }
    return item.current_price?.toFixed(2) || "N/A";
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderSkeletonRow = () => (
    <TableRow>
      {[...Array(9)].map((_, index) => (
        <TableCell key={index}>
          <Skeleton className="h-4 w-full" />
        </TableCell>
      ))}
    </TableRow>
  );

  return (
    <div className="bg-background mt-15 flex flex-col items-center w-full px-4">
      <h2 className="text-3xl font-semibold text-muted-foreground mb-6">
        Crypto Market Details
      </h2>

      <Table className="w-full overflow-x-auto">
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Crypto</TableHead>
            <TableHead>Current Price (USD)</TableHead>
            <TableHead>Market Cap</TableHead>
            <TableHead>Total Volume</TableHead>
            <TableHead>24h Change (%)</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>24h High</TableHead>
            <TableHead>24h Low</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading
            ? [...Array(5)].map((_, i) => <React.Fragment key={i}>{renderSkeletonRow()}</React.Fragment>)
            : crypto &&
              Array.isArray(crypto) &&
              crypto.map((item) => (
                <TableRow key={item.id}>
                  <TableCell onClick={() => toggleFavorite(item.id)} className="cursor-pointer">
                    <Star
                      size={18}
                      className={favorites[item.id] ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>${getPrice(item)}</TableCell>
                  <TableCell>${item.market_cap.toLocaleString()}</TableCell>
                  <TableCell>${item.total_volume.toLocaleString()}</TableCell>
                  <TableCell>{item.price_change_percentage_24h.toFixed(2)}%</TableCell>
                  <TableCell>{new Date(item.last_updated).toLocaleString()}</TableCell>
                  <TableCell>${item.high_24h.toFixed(2)}</TableCell>
                  <TableCell>${item.low_24h.toFixed(2)}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
