import { createBrowserRouter } from "react-router-dom";

import { LoginPage } from "./Login";
import { Root, RootLoader } from "./pages/Roots";
import { DashboardPage } from "./pages/Dashboard";
import { IndexQuotationPage } from "./pages/IndexQuotation";
import { CreateQuotationPage } from "./pages/CreateQuotation";
import { CreateUserPage } from "./pages/users/UserCreate";
import { IndexOrganizationPage } from "./pages/IndexOrganization";
import { EditOrganizationPage } from "./pages/EditQrganization";
import { ProductPage } from "./pages/products/Product";
import { CreateProductPage } from "./pages/products/CreateProduct";
import { EditProductPage } from "./pages/products/EditProduct";
import { CustomersPage } from "./pages/customers/IndexCustomers";
import { CreateCustomerPage } from "./pages/customers/CreateCustomer";
import { EditCustomerPage } from "./pages/customers/EditCustomers";
import { PartialPage } from "./pages/Partial";
import { CustomersDetail } from "./pages/CustomersDetail";
import { IndexPartialPage } from "./pages/IndexPartial";
import {
  SingleUser,
  UserLayout,
  UsersPage,
  userIndexLoader,
  userLoader,
} from "./pages/users";
import { LoginAction } from "./Login";

export const router = createBrowserRouter([
  { path: "/login", action: LoginAction, element: <LoginPage /> },
  {
    path: "/",
    loader: RootLoader, //FIXME: loader in router is loadding state
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
            element: <SingleUser />,
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
        element: <IndexPartialPage />,
      },
      {
        path: "/partial/create",
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
]);
