
import { AdminDashboardOverview } from "@/components/admin-dashboard/admin-dashboard-overview";
import Protectedroute from "@/components/protected-route";


const AdminPage = () => {
    return (
        <Protectedroute role={"ADMIN"}>
            <AdminDashboardOverview />
        </Protectedroute>
    );
};

export default AdminPage;