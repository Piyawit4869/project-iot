import { createBrowserRouter } from "react-router-dom";
import { Root } from "./pages/Roots";
import { DashboardPage } from "./pages/Dashboard";
import { LoginPage } from "./pages/Login";
import { IndexQuotationPage } from "./pages/IndexQuotation";
import { CreateQuotationPage } from "./pages/CreateQuotation";

import { UsersPage } from "./pages/IndexUsers";
import { CreateUserPage } from "./pages/CreateUser";
import { IndexOrganizationPage } from "./pages/IndexOrganization";
import { EditOrganizationPage } from "./pages/EditQrganization";
import { ProductPage } from "./pages/Product";
import { CreateProductPage } from "./pages/CreateProduct";
import { EditProductPage } from "./pages/EditProduct";
import { CustomersPage } from "./pages/IndexCustomers";
import { CreateCustomerPage } from "./pages/CreateCustomer";
import { EditCustomerPage } from "./pages/EditCustomers"


import { PartialPage } from "./pages/Partial";
import { CustomersDetail } from "./pages/CustomersDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    // loader: RootLoader, FIXME: loader in router is loadding state
    element: <Root />,
    children: [
      {
        path: "/",
        // loader: deskIndexLoader,
        // action: deskIndexAction, // FIXME: action is defined to call api
        element: <DashboardPage />,
      },
      {
        path: "quotation/create",
        // action: LoginAction,
        element: <CreateQuotationPage />,
      },
      {
        path: "/quotation",
        element: <IndexQuotationPage />,
      },
      {
        path: "/users",
        element: <UsersPage />,
      },
      {
        path: "/user/create",
        element: <CreateUserPage />,
      },
      {
        path: "/organozation",
        element: <IndexOrganizationPage />,
      },
      {
        path: "/organozation/update",
        element: <EditOrganizationPage />,
      },
      {
        path: "/product",
        element: <ProductPage />,
      },
      {
        path: "/product/create",
        element: <CreateProductPage />,
      },
      {
        path: "/product/update",
        element: <EditProductPage />,
      },
      {
        path: "/partial",
        element: <PartialPage />,
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
    ],
  },
  {
    path: "/login",
    // action: LoginAction,
    element: <LoginPage />,
  },

]);
