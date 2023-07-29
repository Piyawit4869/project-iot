import { createBrowserRouter } from "react-router-dom";
import { Root } from "./pages/Roots";
import { DashboardPage } from "./pages/Dashboard";
import { LoginPage } from "./pages/Login";

import { QuotationPage } from "./components/dashboard/Quotation";
import { IndexQuotationPage } from "./pages/IndexQuotation";

import { CreateQuotationPage } from "./pages/CreateQuotation";


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
        path: "/create",
        // action: LoginAction,
        element: <CreateQuotationPage />,
      },
    ],
  },
  {
    path: "/login",
    // action: LoginAction,
    element: <LoginPage />,
  },

  {
    path: "",
  },
  {
    path: "/indexquotationpage",
    element: <IndexQuotationPage/>,
  }

]);
