"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetTransactionsHistoryQuery } from "@/redux/features/user/useApi";

import { format } from "date-fns";
import { Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Search } from "../search";
import { Pagination } from "../pagination";

export const Transactions = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    searchTerm: "",
  });
  const { data, isFetching } = useGetTransactionsHistoryQuery(query);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.message("Copied to clipboard");
  };

  return (
    <div>
      <Search
        placeholder="Search by transaction id or user email"
        onValueChange={(value) => setQuery({ ...query, searchTerm: value })}
      />
      <Card className="w-full mx-auto mt-[25px]">
        <CardHeader>
          <CardTitle>Transaction <span className="text-rose-400 italic">History</span></CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>User Email</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((transaction: any) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <p
                      onClick={() => handleCopy(transaction.transactionId)}
                      className="flex items-center gap-[5px] group/tnx hover:underline cursor-pointer"
                    >
                      <Copy className="w-[13px] opacity-0 group-hover/tnx:opacity-[1]" />
                      {transaction.transactionId}
                    </p>
                  </TableCell>
                  <TableCell>
                    {transaction.userinfo.email}
                  </TableCell>
                  <TableCell>
                    ${(transaction.amount).toFixed(2)}
                  </TableCell>
                  <TableCell>{transaction.status}</TableCell>
                  <TableCell>
                    {format(transaction.createdAt, "dd/MM/yyyy")}
                  </TableCell>
                </TableRow>
              ))}

              {!isFetching && data?.data.length === 0 && (
               <div className="text-center py-10">
               <p className="text-gray-600 text-lg font-semibold">
                 No Products Found
               </p>
             </div>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Pagination
        total={data?.meta.total || 0}
        limit={10}
        currentPage={query.page}
        onPageChange={(page) => setQuery({ ...query, page })}
        showText
      />
    </div>
  );
};


