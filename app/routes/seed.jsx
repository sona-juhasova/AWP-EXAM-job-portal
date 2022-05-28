import { redirect, json } from "@remix-run/node";
import { Form, useLoaderData, Link } from "@remix-run/react";
import connectDb from "~/db/connectDb.server";
import { requireUserSession, getSession, commitSession } from "~/sessions.server";
import bcrypt from "bcryptjs";




export async function action({ request }) {

    const db = await connectDb();


    const users = await db.models.Users;
    const students = await db.models.Students;
    const companies = await db.models.Companies;



    await users.deleteMany();
    await students.deleteMany();
    await companies.deleteMany();

    var pwd = bcrypt.hashSync("jobportal", 10);


// user 1
    var newUser = await db.models.Users.create({
        username: "kate@jobportal.com",
        password: pwd,
        user_type: "student",

    });

    var newStudent = await db.models.Students.create({
        userId: newUser._id,
        name: "Kate Meowsy",
        date: new Date(),
        bio: "Fill in bio",
        profile_img: "https://media.wired.co.uk/photos/60c8730fa81eb7f50b44037e/3:2/w_3329,h_2219,c_limit/1521-WIRED-Cat.jpeg",
        tags: ["HTML", "CSS"],
        linkedin_link: "https://www.linkedin.com/feed/",
        website_link: "https://www.google.com/",
        published: "on",
    });

    // user 2
    newUser = await db.models.Users.create({
        username: "john@jobportal.com",
        password: pwd,
        user_type: "student",

    });

    newStudent = await db.models.Students.create({
        userId: newUser._id,
        name: "John Paws",
        date: new Date(),
        bio: "Fill in bio",
        profile_img: "https://media.wired.co.uk/photos/60c8730fa81eb7f50b44037e/3:2/w_3329,h_2219,c_limit/1521-WIRED-Cat.jpeg",
        tags: ["HTML", "CSS"],
        linkedin_link: "https://www.linkedin.com/feed/",
        website_link: "https://www.google.com/",
        published: "on",
    });

// user 3
newUser = await db.models.Users.create({
    username: "louise@jobportal.com",
    password: pwd,
    user_type: "student",

});

newStudent = await db.models.Students.create({
    userId: newUser._id,
    name: "Louise Fluff",
    date: new Date(),
    bio: "Fill in bio",
    profile_img: "https://media.wired.co.uk/photos/60c8730fa81eb7f50b44037e/3:2/w_3329,h_2219,c_limit/1521-WIRED-Cat.jpeg",
    tags: ["HTML", "CSS"],
    linkedin_link: "https://www.linkedin.com/feed/",
    website_link: "https://www.google.com/",
    published: "on",
});



    return redirect("/logout");
}



export default function Seed() {
    return (
        <div>
            <Form method="POST" className="">

                <button
                    type="submit"
                >
                    Seed the database
                </button>
            </Form>
            
            <h2>Use following logins:</h2>
            <p>Emails:<br/>
            kate@jobportal.com<br/>
            john@jobportal.com<br/>
            louise@jobportal.com<br/>
            </p>
            <p>Password is always "jobportal" </p>
            </div>

            
    )
}