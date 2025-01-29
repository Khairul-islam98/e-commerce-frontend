"use client";


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useGetAllUserQuery } from "@/redux/features/user/useApi";
import { useState } from "react";
import { Pagination } from "../pagination";
import { Search } from "../search";
import Loader from "../loader";
import { RoleSelector } from "../role-selector";
import { UsersTable } from "./user-table";

export const ManageUser = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    role: "",
    searchTerm: "",
  });
  const { data, isFetching } = useGetAllUserQuery(query);
  

  return (
    <Card className="w-full mx-auto relative">
      <CardHeader>
        <CardTitle><span className=" italic">User</span> <span className="text-rose-400 italic">Management</span></CardTitle>
      </CardHeader>
      <CardContent>
        <Search
          className="mb-4"
          placeholder="eg. Name or Email"
          onValueChange={(searchTerm) => {
            setQuery({ ...query, searchTerm });
          }}
        />
        <RoleSelector
          onRoleChange={(role) => {
            const newRole = role === " " ? "" : role;
            setQuery({ ...query, role: newRole });
          }}
        />
        <UsersTable users={data?.data || []} isLoading={isFetching} />
        <Pagination
          total={data?.meta.total || 0}
          limit={10}
          currentPage={query.page}
          onPageChange={(page) => setQuery({ ...query, page })}
        />
      </CardContent>
      {isFetching ? (
        <Loader />
      ) : (
        ""
      )}
    </Card>
  );
};


