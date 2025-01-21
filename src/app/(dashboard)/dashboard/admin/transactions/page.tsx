import { Transactions } from '@/components/admin-dashboard/transactions';
import Protectedroute from '@/components/protected-route';
import React from 'react';

const TransactionsPage = () => {
    return (
        <Protectedroute role={"ADMIN"}>
            <Transactions />
        </Protectedroute>
    );
};

export default TransactionsPage;