import { ManageShop } from "@/components/admin-dashboard/manage-shop";
import Protectedroute from "@/components/protected-route";


const ManageShopPage = () => {
    return (
        <Protectedroute role={"ADMIN"}>
            <ManageShop />
        </Protectedroute>
    );
};

export default ManageShopPage;