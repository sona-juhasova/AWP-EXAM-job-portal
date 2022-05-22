import { getSession, destroySession } from "~/sessions.server";
import { redirect } from "@remix-run/node";


export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie"));

  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });

}
