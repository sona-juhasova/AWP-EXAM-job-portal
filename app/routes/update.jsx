import { redirect, json } from "@remix-run/node";
import { Form, useLoaderData, Link } from "@remix-run/react";
import connectDb from "~/db/connectDb.server";
import { requireUserSession, getSession, commitSession } from "~/sessions.server";


export async function loader({ params, request }) {

    const session = await getSession(request.headers.get("Cookie"));
    const userId = session.get("userId");

    const db = await connectDb();
    const url = new URL(request.url);
    const student = await db.models.Students.findOne({ userId: userId });




    return json({ userId: userId, student });
}

export async function action({ request }) {
    const session = await requireUserSession(request);
    const body = await request.formData();
    const db = await connectDb();


    var action = body.get("action");

    if (action == "delete_account") {

        const userId = body.get("userId");

        const db = await connectDb();

        await db.models.Students.findOneAndDelete({ userId: userId });

        await db.models.Users.findByIdAndDelete(userId).exec();
        return redirect("/logout");

    }

    if (action == "update") {
        //student id
        var id = body.get("_id");


        var model = {
            name: body.get("name"),
            bio: body.get("bio"),
            profile_img: body.get("profile_img"),
            tags: body.getAll("tags"),
            linkedin_link: body.get("linkedin_link"),
            website_link: body.get("website_link"),
            userId: session.get("userId"),
            published: body.get("published"),
        };
        console.log(model);
        try {
            await db.models.Students.findByIdAndUpdate(id, model).exec();
            return redirect("/");
        }
        catch (error) {
            return json(
                { errors: error.errors, values: Object.fromEntries(body) },
                { status: 400 }
            );
        }
    }
}
export default function UpdateStudent() {
    const loaderData = useLoaderData();
    console.log(loaderData);
    const userId = loaderData.userId;
    const student = loaderData.student;

    if (userId) {

        return (
            <div className="update-page">
                <Link to="/" className="link-back">
                    Back
                </Link>
                <div>
                    <h1 className="edit-title">Edit Profile</h1>

                    <Form method="post">
                        <input type="hidden" defaultValue={student._id} name="_id" />
                        <label className="text-label">Name <br></br>
                            <input
                                name="name"
                                type="text"
                                placeholder="Name"
                                defaultValue={student.name}
                            />
                        </label>
                        <br></br>
                        <label className="text-label">Bio <br></br>
                            <textarea
                                name="bio"
                                placeholder="Bio"
                                defaultValue={student.bio}
                                />
                        </label>
                        <br></br>
                        <label className="text-label">Profile image URL <br></br>
                        <input
                                name="profile_img"
                                type="text"
                                placeholder="Profile image URL"
                                defaultValue={student.profile_img}
                                />
                        </label>
                        <br></br>
                        <label className="text-label">LinkedIn URL  <br></br>
                        <input
                                name="linkedin_link"
                                type="text"
                                placeholder="Linkedin"
                                defaultValue={student.linkedin_link}
                                />
                        </label>
                        <br></br>
                        <label className="text-label">Website URL  <br></br>
                        <input
                                name="website_link"
                                type="text"
                                placeholder="Website"
                                defaultValue={student.website_link}
                                />
                        </label>
                        <br></br>
                        <div className="filter">
                            <p  className="text-label">Select tags</p>
                            <div id="select_tags" className="filter-grid">
                                <div>
                                    <input type="checkbox" id="html" name="tags" value="HTML" defaultChecked={student.tags.indexOf("HTML") > -1} />
                                    <label htmlFor="html">HTML</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="css" name="tags" value="CSS" defaultChecked={student.tags.indexOf("CSS") > -1} />
                                    <label htmlFor="html">CSS</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="javascript" name="tags" value="JavaScript" defaultChecked={student.tags.indexOf("JavaScript") > -1} />
                                    <label htmlFor="javascript">JavaScript</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="react" name="tags" value="React" defaultChecked={student.tags.indexOf("React") > -1} />
                                    <label htmlFor="react">React</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="angular" name="tags" value="Angular" defaultChecked={student.tags.indexOf("Angular") > -1} />
                                    <label htmlFor="angular">Angular</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="vue" name="tags" value="Vue.js" defaultChecked={student.tags.indexOf("Vue.js") > -1} />
                                    <label htmlFor="vue">Vue.js</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="remix" name="tags" value="Remix" defaultChecked={student.tags.indexOf("Remix") > -1} />
                                    <label htmlFor="remix">Remix</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="python" name="tags" value="Python" defaultChecked={student.tags.indexOf("Python") > -1} />
                                    <label htmlFor="python">Python</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="bootstrap" name="tags" value="Bootstrap" defaultChecked={student.tags.indexOf("Bootstrap") > -1} />
                                    <label htmlFor="bootstrap">Bootstrap</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="tailwind" name="tags" value="Tailwind" defaultChecked={student.tags.indexOf("Tailwind") > -1} />
                                    <label htmlFor="tailwind">Tailwind</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="php" name="tags" value="PHP" defaultChecked={student.tags.indexOf("PHP") > -1} />
                                    <label htmlFor="php">PHP</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="ionic" name="tags" value="Ionic" defaultChecked={student.tags.indexOf("Ionic") > -1} />
                                    <label htmlFor="ionic">Ionic</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="mongodb" name="tags" value="MongoDB" defaultChecked={student.tags.indexOf("MongoDB") > -1} />
                                    <label htmlFor="mongodb">MongoDB</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="mysql" name="tags" value="MySQL" defaultChecked={student.tags.indexOf("MySQL") > -1} />
                                    <label htmlFor="mysql">MySQL</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="firebase" name="tags" value="Firebase" defaultChecked={student.tags.indexOf("Firebase") > -1} />
                                    <label htmlFor="firebase">Firebase</label>
                                </div>

                            </div>

                        </div>
                        <br></br>
                        <div className="toggle-wrapper">
                        <label className="switch"> 
                            <input type="checkbox" name="published" defaultChecked={student.published == "on"}></input>
                            <span className="slider round"></span>
                        </label>
                        <p>Make profile public</p>
                        </div>
                        <br></br>
                        <div className="update-button">
                        <button name="action" value="update"
                            type="submit"
                        >
                            Save
                        </button>
                        </div>
                    </Form>

                    {/* delete account button */}
                    <Form method="post" className="delete-button">
                        <input
                            type="hidden"
                            name="userId"
                            defaultValue={userId}
                        ></input>
                        <button
                            type="submit"
                            name="action"
                            value="delete_account"
                        >
                            Delete Account
                        </button>
                    </Form>
                </div>
            </div>
        );
    }

}
