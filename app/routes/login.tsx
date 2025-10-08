import type { Route } from "./+types/login";
import { createUserSession, getUserId } from "~/services/session.server";
import { redirect } from "react-router";
import { login } from "~/api/server/auth";
import LoginForm from "~/components/modules/auth/login-form";

export async function loader({ request }: Route.LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) {
    return redirect("/");
  }
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const formData = await request.formData();
    const user = formData.get("user")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    const res = await login({ user, password });
    console.log({ res });
    if (!res?.accessToken) {
      throw new Error("Invalid email or password");
    }

    const accessToken = res.accessToken;

    return await createUserSession({
      request,
      userId: user,
      accessToken,
      remember: true,
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
