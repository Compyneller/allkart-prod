"use client";
import { DataTable } from "@/components/data-table";
import { fetchUsers } from "data/admin/fetchUsers";
import { columns } from "./colums";
import Loader from "@/components/loader";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDebounce } from "hooks/useDebounce";

const UserLayout = () => {
  const [query, setQuery] = useState("");
  const searchTerm = useDebounce(query, 500);

  const { data, isLoading } = fetchUsers();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="space-y-3">
      <div className="w-full border rounded-lg p-3">
        <h5 className="font-semibold text-xl">Users</h5>
      </div>
      <Input placeholder="Search" onChange={(e) => setQuery(e.target.value)} />
      <DataTable columns={columns} data={data?.data || []} />
    </div>
  );
};

export default UserLayout;
