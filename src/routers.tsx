import { createBrowserRouter } from "react-router-dom";

import { LoginPage } from "./pages/Login";
import { Root } from "./pages/Roots";
import { DashboardPage } from "./pages/analytic/Dashboard";
import { IndexQuotationPage } from "./pages/quotation/IndexQuotation";
import { CreateQuotationPage } from "./pages/quotation/CreateQuotation";
import { CreateUserPage } from "./pages/users/UserCreate";
import { IndexOrganizationPage } from "./pages/organization/IndexOrganization";
import { EditOrganizationPage } from "./pages/organization/EditQrganization";
import { ProductPage } from "./pages/product/ProductIndex";
import { CreateProductPage } from "./pages/product/ProductCreate";
import { EditProductPage } from "./pages/product/ProductEdit";
import { CustomersPage } from "./pages/customers/CustomerIndex";
import { CreateCustomerPage } from "./pages/customers/CustomerCreate";
import { EditCustomerPage } from "./pages/customers/EditCustomers";
// import { CustomersDetail } from "./pages/CustomersDetail";
import {
  SingleUser,
  UserLayout,
  UsersPage,
  userIndexLoader,
  userLoader,
} from "./pages/users";
// import { CustomerSingle, customerIndexLoader } from "./pages/customers";
import { ProductCreateAction, productIndexLoader } from "./pages/product";
import { LoginAction } from "./pages/Login";
import { BranchEdit, BranchIndex, BranchSingle } from "./pages/branch";
import { CustomersDetail } from "./pages/customers/CustomersDetail";
import { BranchCreate } from "./pages/branch";
import { ProductSingle } from "./pages/product/ProductSingle";

export const router = createBrowserRouter([
  {
    path: "/login",
    action: LoginAction,
    element: <LoginPage />,
  },
  {
    path: "/",
    // loader: RootLoader, //FIXME: loader in router is loadding state
    element: <Root />,
    children: [
      {
        path: "/",
        // loader: deskIndexLoader,
        // action: deskIndexAction, // FIXME: action is defined to call api
        element: <DashboardPage />,
      },
      {
        path: "/quotation/create",
        // action: LoginAction,
        element: <CreateQuotationPage />,
      },
      {
        path: "/quotation",
        element: <IndexQuotationPage />,
      },
      {
        path: "users",
        loader: userIndexLoader,
        // action: deskIndexAction, // FIXME: action is defined to call api
        element: <UsersPage />,
      },
      {
        path: "users/new",
        // loader: deskIndexLoader,
        element: <CreateUserPage />,
      },
      {
        id: "user",
        path: "users/:id",
        loader: userLoader,
        element: <UserLayout />,
        children: [
          {
            path: "",
            element: <SingleUser />,
          },
          {
            path: "edit",
            // action: UserUpdateAction,
            element: <SingleUser canEdit={true} />,
          },
        ],
      },
      {
        path: "/organization",
        element: <IndexOrganizationPage />,
      },
      {
        path: "/organization/update",
        element: <EditOrganizationPage />,
      },
      {
        path: "/products",
        loader: productIndexLoader,
        element: <ProductPage />,
      },
      {
        path: "/product/create",
        action: ProductCreateAction,
        element: <CreateProductPage />,
      },
      {
        path: "/product/update",
        element: <EditProductPage />,
      },
      {
        path: "/product/single",
        element: <ProductSingle />,
      },
      {
        path: "/customers",
        element: <CustomersPage />,
      },
      {
        path: "/customers/create",
        element: <CreateCustomerPage />,
      },
      {
        path: "/customers/update",
        element: <EditCustomerPage />,
      },
      {
        path: "/customers/detail",
        element: <CustomersDetail />,
      },
      {
        path: "/branches",
        element:<BranchIndex/>,
      },
      {
        path: "/branches/create",
        element: <BranchCreate/>,
      },
      {
        path: "/branches/update",
        element: <BranchEdit/>,
      },
      {
        path: "/branches/single",
        element: <BranchSingle/>,
      },
    ],
  },
]);
