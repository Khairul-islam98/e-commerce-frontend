import Protectedroute from "@/components/protected-route";
import { EditMyShop } from "@/components/vendor-dashboard/edit-shop";


const UpdateShopPage = () => {
    return (
        <Protectedroute role={"VENDOR"}>
            <EditMyShop />
        </Protectedroute>
    );
};

export default UpdateShopPage;