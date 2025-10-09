// import { type RouteConfig, index } from "@react-router/dev/routes";

// export default [index("routes/home.tsx")] satisfies RouteConfig;

import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  // Public
  route("login", "routes/login.tsx"),
  //   route("/logout", "routes/logout.tsx"),

  // Protected wrapper
  // Admin area layout (protected)
  layout("routes/backoffice-layout.tsx", [
    // route("routes/backoffice/[organization]/customer/index.tsx"),

    // Home => Dashboard analytic
    index("routes/backoffice/home.tsx"),

    // ...prefix(":organization", [
    //   // message
    //   ...prefix("message", [
    //     index("routes/tickets/index.tsx"),
    //     route("/:id/edit", "routes/tickets/single/edit.tsx"),
    //     route("/:id", "routes/tickets/single/view.tsx"),
    //     route("/create", "routes/tickets/create.tsx"),
    //   ]),
    // customer
    ...prefix("customer", [
      index("routes/backoffice/customer/index.tsx"),
      route("/create", "routes/backoffice/customer/create.tsx"),
      route("/:id", "routes/backoffice/customer/single.tsx"),
      // route("/:id/edit", "routes/tickets/single/edit.tsx"),
    ]),
    //   // products
    //   ...prefix("products", [
    //     index("routes/users/index.tsx"),
    //     route("/:id", "routes/users/single.tsx"),
    //     route("/create", "routes/users/create.tsx"),
    //   ]),

    layout("routes/backoffice/settings/setting-layout.tsx", [
      ...prefix("setting-organization", [
        index("routes/backoffice/settings/setting.tsx"),
        route("branch", "routes/backoffice/settings/branch/branch.tsx"),
        // route("third-party", "routes/backoffice/settings/third-party.tsx"),
        // route("permission", "routes/backoffice/settings/permission.tsx"),
      ]),
    ]),
  ]),

  // ]),

  //     route("/logout", "routes/logout.tsx"),
  //   ]),
] satisfies RouteConfig;

// /login
// /locations
// /locations/1
// /locations/create
