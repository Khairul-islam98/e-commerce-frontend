import React from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"; 
import { Button } from "@/components/ui/button"; 
import { useUserStatusChangeMutation } from '@/redux/features/user/useApi';
import { toast } from 'sonner';
import { UserCog } from "lucide-react"; 
import { RiCollapseVerticalLine } from 'react-icons/ri';

interface User {
  id: string;
  status: string;
  role: string;
}

export const UserStatusChange = ({ user }: { user: User }) => {
  const [statusChange] = useUserStatusChangeMutation();

  const handleStatusChange = async (newStatus: string) => {
 
    try {
      const res = await statusChange({ userId: user.id, data: { status: newStatus } }).unwrap();
     
      toast.success(`User status changed to ${newStatus}`);
    } catch (error) {
   
      toast.error('Failed to change user status.');
    }
  };

  const handleRoleChange = async (newRole: string) => {

    try {
      const res = await statusChange({ userId: user.id, data: { role: newRole } }).unwrap();
    
      toast.success(`User role changed to ${newRole}`);
    } catch (error) {
  
      toast.error('Failed to change user role.');
    }
  };

  return (
    <div className=" flex gap-2">
      {/* Status Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
          <UserCog className="w-4 h-4" /> 
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => handleStatusChange('ACTIVE')}>Active</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusChange('BLOCKED')}>Blocked</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusChange('DELETED')}>Deleted</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Role Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="">
           <RiCollapseVerticalLine className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => handleRoleChange('ADMIN')}>Admin</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleRoleChange('VENDOR')}>Vendor</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleRoleChange('CUSTOMER')}>Customer</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
