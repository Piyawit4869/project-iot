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
import { EditCustomerPage } from "./pages/EditCustomers";

import { PartialPage } from "./pages/Partial";

import { CustomersDetail } from "./pages/CustomersDetail";

import { IndexPartialPage } from "./pages/IndexPartial";

import { UtotechRoot } from "./pages/utotech/UtotechRoot";
import { AboutUs, ContactUs, Utotech } from "./pages/utotech";

export const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <UtotechRoot />,
    children: [
      { path: "/", element: <Utotech /> },
      { path: "/about", element: <AboutUs /> },
      { path: "/contact", element: <ContactUs /> },
    ],
  },
  {
    path: "/admin",
    // loader: RootLoader, FIXME: loader in router is loadding state
    element: <Root />,
    children: [
      {
        path: "/admin",
        // loader: deskIndexLoader,
        // action: deskIndexAction, // FIXME: action is defined to call api
        element: <DashboardPage />,
      },
      {
        path: "/admin/quotation/create",
        // action: LoginAction,
        element: <CreateQuotationPage />,
      },
      {
        path: "/admin/quotation",
        element: <IndexQuotationPage />,
      },
      {
        path: "/admin/users",
        element: <UsersPage />,
      },
      {
        path: "/admin/user/create",
        element: <CreateUserPage />,
      },
      {
        path: "/admin/organozation",
        element: <IndexOrganizationPage />,
      },
      {
        path: "/admin/organozation/update",
        element: <EditOrganizationPage />,
      },
      {
        path: "/admin/product",
        element: <ProductPage />,
      },
      {
        path: "/admin/product/create",
        element: <CreateProductPage />,
      },
      {
        path: "/admin/product/update",
        element: <EditProductPage />,
      },
      {
        path: "/admin/partial",
        element: <IndexPartialPage />,
      },
      {
        path: "/admin/partial/create",
        element: <PartialPage />,
      },
      {
        path: "/admin/customers",
        element: <CustomersPage />,
      },
      {
        path: "/admin/customers/create",
        element: <CreateCustomerPage />,
      },
      {
        path: "/admin/customers/update",
        element: <EditCustomerPage />,
      },
      {
        path: "/admin/customers/detail",
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
