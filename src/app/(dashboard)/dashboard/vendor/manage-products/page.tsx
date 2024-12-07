import Protectedroute from '@/components/protected-route';
import { ManageProducts } from '@/components/vendor-dashboard/manage-product';
import React from 'react';

const ManageProductPage = () => {
    return (
        <Protectedroute role={"VENDOR"}>
            <ManageProducts />
        </Protectedroute>
    );
};

export default ManageProductPage;