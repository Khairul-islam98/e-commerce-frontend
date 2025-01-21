"use client";

import Protectedroute from '@/components/protected-route';
import { MyShopOverview } from '@/components/vendor-dashboard/my-shop-overview';
import React from 'react';

const VendorPage = () => {
    return (
        <Protectedroute role={"VENDOR"}>
            <MyShopOverview />
        </Protectedroute>
    );
};

export default VendorPage;