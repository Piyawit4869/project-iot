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
    index("routes/backoffice/home.tsx"),

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
