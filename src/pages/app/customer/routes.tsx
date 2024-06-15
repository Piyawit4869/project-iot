import { CustomersCreate } from "./createpage";
import { CustomersIndex } from "./indexpage";
import { CustomersSingle } from "./singlepage";

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