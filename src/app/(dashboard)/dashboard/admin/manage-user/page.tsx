
import { ManageUser } from '@/components/admin-dashboard/manage-user';
import Protectedroute from '@/components/protected-route';
import React from 'react';

const ManageUserPage = () => {
    return (
        <Protectedroute role={"ADMIN"}>
            <ManageUser />
        </Protectedroute>
    );
};

export default ManageUserPage;