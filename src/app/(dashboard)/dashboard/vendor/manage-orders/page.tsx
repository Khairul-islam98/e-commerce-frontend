import Protectedroute from "@/components/protected-route";
import { ManageOrder } from "@/components/vendor-dashboard/manage-order";


const ManageOrderPage = () => {
    return (
        <Protectedroute role={"VENDOR"}>
            <ManageOrder />
        </Protectedroute>
    );
};

export default ManageOrderPage;