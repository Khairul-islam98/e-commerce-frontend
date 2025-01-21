import Protectedroute from "@/components/protected-route";
import { CreateProduct } from "@/components/vendor-dashboard/create-product";


const CreateProductPage = () => {
    return (
        <Protectedroute role={"VENDOR"}>
            <CreateProduct />
        </Protectedroute>
    );
};

export default CreateProductPage;