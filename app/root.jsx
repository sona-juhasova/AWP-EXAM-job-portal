import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { useLoaderData, Link, Form } from "@remix-run/react";
import { useState } from "react";
import { getSession } from "~/sessions.server";

import connectDb from "~/db/connectDb.server";

import Header from "./components/header"

import styles from "./styles/app.css";

export const meta = () => ({
  charset: "utf-8",
  title: "Job Portal App",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

export async function loader({ request }) {
  const db = await connectDb();
  const session = await getSession(request.headers.get("cookie"));
  if (session) {
    const userId = session.get("userId");
    const user = await db.models.Users.findById(userId);
    if (user) {
      return {
        userId: userId,
        userType: user.user_type,
        userName: user.username
      }
    }
  }
  return {
    userId: null,
  }

}



export default function App() {
  var loaderData = useLoaderData();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <Header props={loaderData} />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <footer>
          <div className="footer"></div>
        </footer>
      </body>

    </html>
  );
}
