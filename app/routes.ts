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
  route("/forgot-password", "routes/forgot.tsx"),
  route("/logout", "routes/logout.tsx"),
  route("/verify-otp", "routes/verify.tsx"),
  route("/reset-password", "routes/reset-pass.tsx"),

  // route("public", "routes/public.tsx", [index("routes/backoffice/home.tsx")]),

  layout("routes/public-layout.tsx", [
    route("public/catelog", "routes/public/catelog/index.tsx"),
    route("public/notation-view", "routes/public/notation-view/index.tsx"),
    route("public/notation-view/:id", "routes/public/notation-view/single.tsx"),
  ]),

  // Protected wrapper
  // Admin area layout (protected)
  // ...prefix(":organization", [
  layout("routes/backoffice-layout.tsx", [
    // route("routes/backoffice/[organization]/customer/index.tsx"),

    // Home => Dashboard analytic
    index("routes/backoffice/home.tsx"),
    route("message", "routes/backoffice/messages/index.tsx"),

    // customer
    ...prefix("customer", [
      index("routes/backoffice/customer/index.tsx"),
      route("/create", "routes/backoffice/customer/create.tsx"),
      route("/:id", "routes/backoffice/customer/single.tsx"),
      // route("/:id/edit", "routes/tickets/single/edit.tsx"),
    ]),

    // Orders
    ...prefix("orders", [
      index("routes/backoffice/orders/index.tsx"),
      route("/create", "routes/backoffice/orders/create.tsx"),
      route("/:id", "routes/backoffice/orders/single.tsx"),
      // route("/:id/edit", "routes/tickets/single/edit.tsx"),
    ]),

    // Inventories
    ...prefix("inventory", [
      index("routes/backoffice/inventory/index.tsx"),
      route("create", "routes/backoffice/inventory/create.tsx"),
      route(":id", "routes/backoffice/inventory/single.tsx"),
    ]),

    // Products
    ...prefix("products", [
      index("routes/backoffice/products/index.tsx"),
      route("create", "routes/backoffice/products/create.tsx"),
      route(":id", "routes/backoffice/products/single.tsx"),
    ]),

    // User
    ...prefix("users", [
      index("routes/backoffice/users/index.tsx"),
      route("create", "routes/backoffice/users/create.tsx"),
      route("/:id", "routes/backoffice/users/single.tsx"),
      // route("/:id", "routes/backoffice/users/edit.tsx"),
    ]),

    // Role
    ...prefix("roles", [
      index("routes/backoffice/roles/index.tsx"),
      route("create", "routes/backoffice/roles/create.tsx"),
      route("/:id", "routes/backoffice/roles/single.tsx"),
      // route("/:id", "routes/backoffice/users/edit.tsx"),
    ]),

    // On-Boarding
    ...prefix("on-boarding", [
      index("routes/backoffice/on-boarding/index.tsx"),
      route("management", "routes/backoffice/on-boarding/management/index.tsx"),
      route(
        "management/create",
        "routes/backoffice/on-boarding/management/create.tsx"
      ),
      route(
        "/management/single",
        "routes/backoffice/on-boarding/management/single.tsx"
      ),
      route("team", "routes/backoffice/on-boarding/team/index.tsx"),
      route("team/single", "routes/backoffice/on-boarding/team/single.tsx"),
      route("setting", "routes/backoffice/on-boarding/setting.tsx"),
    ]),

    //onboarding
    // index
    // onboarding-management
    // create
    // single/detail

    // onboarding-team
    // create
    // single/detail

    // onboarding-setting

    //   // customer
    //   ...prefix("customer", [
    // ...prefix(":organization", [
    //   // message
    //   ...prefix("message", [
    //     index("routes/tickets/index.tsx"),
    //     route("/:id/edit", "routes/tickets/single/edit.tsx"),
    //     route("/:id", "routes/tickets/single/view.tsx"),
    //     route("/create", "routes/tickets/create.tsx"),
    //   ]),

    //   // products
    //   ...prefix("products", [
    //     index("routes/users/index.tsx"),
    //     route("/:id", "routes/users/single.tsx"),
    //     route("/create", "routes/users/create.tsx"),
    //   ]),

    ...prefix("setting-organization/:id/branches", [
      route("create", "routes/backoffice/settings/create.tsx"),
    ]),

    // ...prefix("setting-organization", [
    //   route(":id/create", "routes/backoffice/settings/create.tsx"),
    // ]),

    layout("routes/backoffice/settings/setting-layout.tsx", [
      ...prefix("setting-organization", [
        index("routes/backoffice/settings/setting.tsx"),
        // route("create", "routes/backoffice/settings/create.tsx"),
        route("branch", "routes/backoffice/settings/branch/branch.tsx"),
        route(
          "third-party",
          "routes/backoffice/settings/third-party/third-party.tsx"
        ),
        // route(
        //   "third-party/line/:id",
        //   "routes/backoffice/settings/third-party/third-party-line.tsx"
        // ),
        // route(
        //   "third-party/ai/:id",
        //   "routes/backoffice/settings/third-party/third-party-open-ai.tsx"
        // ),

        route(
          "third-party/line",
          "routes/backoffice/settings/third-party/third-party-line.tsx"
        ),
        route(
          "third-party/ai",
          "routes/backoffice/settings/third-party/third-party-open-ai.tsx"
        ),
      ]),
    ]),

    route("login-log", "routes/backoffice/login-log.tsx"),
  ]),
  //line - ai

  // ]),

  // ]),

  //     route("/logout", "routes/logout.tsx"),
  //   ]),
] satisfies RouteConfig;

// /login
// /locations
// /locations/1
// /locations/create
