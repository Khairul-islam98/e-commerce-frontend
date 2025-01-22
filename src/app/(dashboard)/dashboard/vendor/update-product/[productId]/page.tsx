import Protectedroute from "@/components/protected-route";
import { UpdateProduct } from "@/components/vendor-dashboard/update-product";


const UpdateProductPage = () => {
    return (
        <Protectedroute role={"VENDOR"}>
            <UpdateProduct />
        </Protectedroute>
    );
};

export default UpdateProductPage;