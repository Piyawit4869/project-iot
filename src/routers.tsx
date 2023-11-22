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
import {
  AboutUs,
  AllFeature,
  ContactUs,
  SingleFeature,
  Utotech,
  featureLoader,
  featuresHomeIndexLoader,
  featuresIndexLoader,
  optionIndexLoader,
} from "./pages/utotech";
import { SettingUtotech, featuresLoader } from "./pages/SettingUtotech";
import {
  SingleSettingFeature,
  FeatureEditAction,
} from "./pages/SettingFeature";
import { CreateFeature, FeatureCreateAction } from "./pages/CreateFeature";
import { CreateOption, OptionCreateAction } from "./pages/CreateOption";
import {
  OptionEditAction,
  SingleSettingOption,
  optionLoader,
} from "./pages/SettingOption";

export const router = createBrowserRouter([
  {
    path: "/login",
    // action: LoginAction,
    element: <LoginPage />,
  },
  {
    path: "/",
    id: "UtotechRoot",
    element: <UtotechRoot />,
    children: [
      { path: "/", element: <Utotech />, loader: featuresHomeIndexLoader },
      {
        path: "/all-feature",
        element: <AllFeature />,
        loader: featuresIndexLoader,
      },
      { path: "/about", element: <AboutUs />, loader: optionIndexLoader },
      { path: "/contact", element: <ContactUs /> },
      {
        path: "/feature/:id",
        element: <SingleFeature />,
        loader: featureLoader,
      },
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
      {
        path: "/admin/utotech",
        loader: featuresLoader,
        element: <SettingUtotech />,
      },
      {
        path: "/admin/create/feature",
        action: FeatureCreateAction,
        element: <CreateFeature />,
      },
      {
        path: "/admin/feature/:id",
        element: <SingleSettingFeature />,
        loader: featureLoader,
        action: FeatureEditAction,
      },
      {
        path: "/admin/create/option",
        action: OptionCreateAction,
        element: <CreateOption />,
      },
      {
        path: "/admin/option/:id",
        element: <SingleSettingOption />,
        loader: optionLoader,
        action: OptionEditAction,
      },
    ],
  },
]);
