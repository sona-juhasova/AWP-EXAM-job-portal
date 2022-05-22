import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";


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



export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <a href="/login">Login</a> <br/>
          <a href="/register">Register</a><br/>
          <a href="/logout">Log out</a><br/>
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
