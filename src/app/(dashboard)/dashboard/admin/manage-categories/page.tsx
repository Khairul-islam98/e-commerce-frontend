import { ManageCategory } from '@/components/admin-dashboard/manage-category';
import Protectedroute from '@/components/protected-route';
import React from 'react';

const ManageCategorePage = () => {
    return (
        <Protectedroute role={"ADMIN"}>
            <ManageCategory />
        </Protectedroute>
    );
};

export default ManageCategorePage;