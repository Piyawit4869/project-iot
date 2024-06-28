import { CustomersCreate } from "./Createpage";
import { CustomersIndex } from "./Indexpage";
import { CustomersSingle } from "./Singlepage";

export const routes = [
  {
    path: "customers",
    children: [
      {
        path: "",
        element: <CustomersIndex/>
      },
      {
        path: "create",
        element: <CustomersCreate/>
      },
      {
        path: ":id", 
        element: <CustomersSingle/>
      }
    ],
  }
];