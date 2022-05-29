import { Form, useActionData, useLoaderData, Link } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { getSession, commitSession } from "~/sessions.server";
import connectDb from "~/db/connectDb.server";
import bcrypt from "bcryptjs";
import CatchBoundary from "~/components/CatchBoundary";
import ErrorBoundary from "~/components/ErrorBoundary";

export async function action({ request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const db = await connectDb();
  const form = await request.formData();

  const user = await db.models.Users.findOne({
    username: form.get("username").trim(),
  });
  console.log("length ", form.get("username").trim().length);
  if (form.get("username").trim().length < 3) {
    return json(
      { errorMessage: "Username should be longer then 3" },
      { statrus: 401 }
    );
  }
  if (user) {
    return json({ errorMessage: "This user alredy exists" }, { statrus: 401 });
  } else if (
    form.get("password").trim() !== form.get("repeatPassword").trim()
  ) {
    return json({ errorMessage: "Password didn't match" }, { statrus: 401 });
  } else if (form.get("password") === "") {
    return json({ errorMessage: "Type your password" }, { statrus: 401 });
  } else if (form.get("password").trim() == form.get("repeatPassword").trim()) {
    let hash = form.get("password").trim();
    var pwd = bcrypt.hashSync(hash, 10);

    const newUser = await db.models.Users.create({
      username: form.get("username").trim(),
      password: pwd, 
      user_type: form.get("user_type"),

    });
  
    var userType = form.get("user_type");
    if(userType === "student" )
    {
      const newStudent = await db.models.Students.create({
        userId : newUser._id,
        tags: [],
        published : false,
        date: new Date()

      });
    }
    if(userType === "company" )
    {
      const newCompany = await db.models.Companies.create({
        userId : newUser._id,
        favourite: [] 

      });
    }
    session.set("userId", newUser._id);
    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
}

export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie"));

  var userId = session.has("userId");
  if (userId) {
    return redirect("/");
  };
  return json({
    userId: session.has("userId"),
  });
}
// function hashing(pwd) {
//   var hash = bcrypt.hashSync(pwd, 10);
//   return hash;
// }
export default function Register() {
  const { userId } = useLoaderData();
  const actionData = useActionData();


  return (
    <div className="form-page">
      <div className="form-wrapper">
        <h1>Job Portal</h1>
        <br />

        {actionData?.errorMessage ? (
          <p>
            {actionData.errorMessage}
          </p>
        ) : null}
        <Form method="post" className="form-login">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Email"
          />
 
          
          <div className="radio-btns">
            <input type="radio" id="student" name="user_type" value="student" />
            <label htmlFor="student">Student</label>
            <input type="radio" id="company" name="user_type" value="company" />
            <label htmlFor="company">Company</label>
          </div>

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />

          <input
            type="password"
            name="repeatPassword"
            id="repeatPassword"
            placeholder="Confirm password"
          />
          <div className="button-wrapper">
            <button
              type="submit"
              className="my-3 p-2 border rounded text-white font-bold bg-teal-800"
            >
              Register
            </button>

            <p>
              <span>Already have an account? </span>
              <Link to="/login" className="underline">
                Log In
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );

}

export { CatchBoundary, ErrorBoundary };
