import Protectedroute from '@/components/protected-route';
import { ManageReview } from '@/components/vendor-dashboard/manage-review';
import React from 'react';

const MangeReviewPage = () => {
    return (
        <Protectedroute role={"VENDOR"}>
            <ManageReview />
        </Protectedroute>
    );
};

export default MangeReviewPage;
