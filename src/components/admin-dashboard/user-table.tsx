import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { useAppSelector } from "@/redux/hooks";
import { UserStatusChange } from "./user-status-change";

 
  interface IProps {
    users: any[];
    isLoading: boolean;
  }
 export  const UsersTable: React.FC<IProps> = ({ users, isLoading }) => {
    const { user: authUser } = useAppSelector((state) => state.auth);
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {authUser?.id === user.id ? (
                  "-"
                ) : (
                  <div className="flex space-x-2">
                    <UserStatusChange user={user} />
                   
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
  
          {!isLoading && users.length === 0 && <div className="text-center py-10">
                <p className="text-gray-600 text-lg font-semibold">
                  No Products Found
                </p>
              </div> }
        </TableBody>
      </Table>
    );
  };
  

  