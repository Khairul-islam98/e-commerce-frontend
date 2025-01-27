import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { TRole } from "@/types";

  import React, { useState } from "react";
  
  interface IProps {
    onRoleChange: (role: TRole | " ") => void;
  }
  
  export const RoleSelector: React.FC<IProps> = ({ onRoleChange }) => {
    const [roleFilter, setRoleFilter] = useState<TRole | " ">(" ");
  
    const handlechange = (value: TRole) => {
      onRoleChange(value);
      setRoleFilter(value);
    };
  
    return (
      <div className="mb-4">
        <Select
          onValueChange={(value) => handlechange(value as TRole)}
          defaultValue=" "
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" ">All</SelectItem>
            <SelectItem value="CUSTOMER">Customer</SelectItem>
            <SelectItem value="VENDOR">Vendor</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  };
  


  