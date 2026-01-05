import type { Route } from "./+types/login";
import { createUserSession, getUser } from "~/services/session.server";
import { redirect } from "react-router";
import { getMe, login } from "~/api/server/auth";
import LoginForm from "~/components/modules/auth/login-form";
import { getUserMapPermission } from "~/utils/permission";

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUser(request);

  if (user?.id) {
    return redirect("/");
  }
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const formData = await request.formData();
    const user = formData.get("user")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    const res = await login({ user, password });
    const accessToken = res.accessToken;
    const refreshToken = res.refreshToken;

    const me = await getMe(accessToken ?? "");

    const result = Object.assign({}, me);

    delete result.role;
    delete result.tempPassword;
    delete result.mainDepartment;
    delete result.updatedAt;
    delete result.createdAt;
    delete result.organization.branches;
    const normalizedPermissions = getUserMapPermission(me);

    result.permissions = normalizedPermissions;

    //  delete result.permissions = {};

    if (!res?.accessToken) {
      throw new Error("Invalid email or password");
    }

    return await createUserSession({
      request,
      user: result,
      accessToken,
      refreshToken,
      // refreshTokenMaxAgeSec: 60,
      // remember: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unknown error occurred" };
  }
}

export default function LoginPage() {
  return <LoginForm />;
}
