// import UserProfile from '../views/super-admins/user-profile';
// import UserAdds from '../views/super-admins/user-add';
// import CompanyList from '../views/super-admins/company-list';
// import CompanyAdd from '../views/super-admins/company-add';
// import UserList from '../views/dashboard/app/user-list';
// import userProfileEdit from '../views/dashboard/app/user-privacy-setting';


//Super Admin
import SuperAdminAdd from '../views/super-admin/manage-users/admin-add';
import SuperAdminList from '../views/super-admin/manage-users/admin-list';
import CompanyAdd from '../views/super-admin/company/company-add';
import CompanyList from '../views/super-admin/company/company-list';

//Admin
import UserAdd from '../views/admin/manage-user/user-add';
import UsersList from '../views/admin/manage-user/user-list';
import CatalogDataAdd from '../views/admin/catalog/catalog-data-add';
import CatalogList1 from '../views/admin/catalog/catalog-list1';
import CatalogList2 from '../views/admin/catalog/catalog-list2';
import CatalogList3 from '../views/admin/catalog/catalog-list3';

//Admin & User
import DocumentAdd from '../views/admin/document/document-add';
import DocumentList from '../views/admin/document/document-list';

const routes = [
    //superadmin
    {

        name: "admin-list",
        key: "admin-list",
        role: ["ROLE_SUPERADMIN"],
        route: "/dashboard/app/admin-list",
        component: SuperAdminList,
    },
    {

        name: "admin-add",
        key: "admin-add",
        role: ["ROLE_SUPERADMIN"],
        route: "/dashboard/app/admin-add",
        component: SuperAdminAdd,
    },
    {

        name: "company-add",
        key: "company-add",
        role: ["ROLE_SUPERADMIN"],
        route: "/dashboard/app/company-add",
        component: CompanyAdd,
    },
    {

        name: "company-list",
        key: "company-list",
        role: ["ROLE_SUPERADMIN"],
        route: "/dashboard/app/company-list",
        component: CompanyList,
    },

    //admin
    {

        name: "user-add",
        key: "user-add",
        role: ["ROLE_ADMIN"],
        route: "/dashboard/app/user-add",
        component: UserAdd,
    },
    {

        name: "user-list",
        key: "user-list",
        role: ["ROLE_ADMIN"],
        route: "/dashboard/app/user-list",
        component: UsersList,
    },
    {

        name: "catalog-add",
        key: "catalog-add",
        role: ["ROLE_ADMIN"],
        route: "/dashboard/app/catalog-add",
        component: CatalogDataAdd,
    },
    {

        name: "company-list1",
        key: "company-list1",
        role: ["ROLE_ADMIN"],
        route: "/dashboard/app/catalog-list1",
        component: CatalogList1,
    },
    {

        name: "company-list2",
        key: "company-list2",
        role: ["ROLE_ADMIN"],
        route: "/dashboard/app/catalog-list2",
        component: CatalogList2,
    },
    {

        name: "company-list3",
        key: "company-list3",
        role: ["ROLE_ADMIN"],
        route: "/dashboard/app/catalog-list3",
        component: CatalogList3,
    },


    // user
    {

        name: "document-add",
        key: "document-add",
        role: ["ROLE_ADMIN","ROLE_USER"],
        route: "/dashboard/app/document-add",
        component: DocumentAdd,
    },
    {

        name: "document-list",
        key: "document-list",
        role: ["ROLE_ADMIN","ROLE_USER"],
        route: "/dashboard/app/document-list",
        component: DocumentList,
    },
    // {
    //
    //     name: "admin-list",
    //     key: "admin-list",
    //     role: ["ROLE_SUPERADMIN"],
    //     route: "/dashboard/app/admin-add",
    //     component: UserProfile,
    // },
    {
        type: "collapse",
        name: "Files",
        key: "all-files",
        role: ["ROLE_SUPERADMIN"],
        route: "/dashboard/app/user-add",
        component: UserAdd,
    },
    // {
    //     type: "collapse",
    //     name: "Upload",
    //     key: "file-upload",
    //     role: ["ROLE_SUPERADMIN"],
    //     route: "/dashboard/app/user-list",
    //     component: UserList,
    // },
    // {
    //     type: "collapse",
    //     name: "User",
    //     key: "user",
    //     role: ["ROLE_SUPERADMIN"],
    //     route: "/dashboard/app/company-list",
    //     component: CompanyList,
    // },
    // {
    //     type: "collapse",
    //     name: "Register",
    //     key: "register",
    //     role: ["ROLE_SUPERADMIN"],
    //     route: "/dashboard/app/company-add",
    //     component: CompanyAdd,
    // },

];

export default routes;
