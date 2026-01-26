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

  layout("routes/public-layout.tsx", [
    route("public/catelog", "routes/public/catelog/index.tsx"),
    route("public/notation-view", "routes/public/notation-view/index.tsx"),
    route("public/notation-view/:id", "routes/public/notation-view/single.tsx"),
  ]),
  layout("routes/backoffice-layout.tsx", [
    // Home => Dashboard analytic
    index("routes/backoffice/home.tsx"),

    // User
    ...prefix("users", [
      index("routes/backoffice/users/index.tsx"),
      route("create", "routes/backoffice/users/create.tsx"),
      route("/:id", "routes/backoffice/users/single.tsx"),
    ]),

    route("login-log", "routes/backoffice/login-log.tsx"),
  ]),
] satisfies RouteConfig;
