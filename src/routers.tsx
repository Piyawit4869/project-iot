import { createBrowserRouter } from "react-router-dom";

import { LoginPage } from "./Login";
import { Root, RootLoader } from "./pages/Roots";
import { DashboardPage } from "./pages/Dashboard";
import { IndexQuotationPage } from "./pages/IndexQuotation";
import { CreateQuotationPage } from "./pages/CreateQuotation";
import { CreateUserPage } from "./pages/users/UserCreate";
import { IndexOrganizationPage } from "./pages/IndexOrganization";
import { EditOrganizationPage } from "./pages/EditQrganization";
import { ProductPage } from "./pages/products/ProductIndex";
import { CreateProductPage } from "./pages/products/ProductCreate";
import { EditProductPage } from "./pages/products/ProductEdit";
import { CustomersPage } from "./pages/customers/CustomerIndex";
import { CreateCustomerPage } from "./pages/customers/CustomerCreate";
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
import { customerIndexLoader } from "./pages/customers";
import { ProductCreateAction, productIndexLoader } from "./pages/products";
import { LoginAction } from "./Login";

export const router = createBrowserRouter([
  {
    path: "/login",
    action: LoginAction,
    element: <LoginPage />,
  },
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
        path: "/product",
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
        path: "/partial",
        element: <IndexPartialPage />,
      },
      {
        path: "/partial/create",
        element: <PartialPage />,
      },
      {
        path: "/customers",
				loader: customerIndexLoader,
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
