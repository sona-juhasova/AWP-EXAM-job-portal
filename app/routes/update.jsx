import { redirect, json } from "@remix-run/node";
import { Form, useLoaderData, Link } from "@remix-run/react";
import connectDb from "~/db/connectDb.server";
import { requireUserSession, getSession, commitSession } from "~/sessions.server";


export async function loader({ params, request }) {
 
    const session = await getSession(request.headers.get("Cookie"));
    const userId = session.get("userId");
    
    const db = await connectDb();
    const url = new URL(request.url);
    const student = await db.models.Students.find({ userId: userId });

    
    return json({ userId: userId, student });
}

export async function action({ request }) {
    const session = await requireUserSession(request);
    const body = await request.formData();
    const db = await connectDb();

    var id = body.get("_id");
    
    var action = body.get("action");
    if (action == "delete_profile") {
        const db = await connectDb();
        if (session.has("userId")) {
            db.models.CodeSnippet.findByIdAndDelete(id).exec();
            return redirect("/");
        } else alert("You cant delete this item");
    } else if (action == "delete_account") {
        const db = await connectDb();
        if (session.has("userId")) {
            db.models.CodeSnippet.findByIdAndDelete(id).exec();
            return redirect("/");
        } else alert("You cant delete this item");

    }
    
    var model = {
        name: body.get("name"),
        date: new Date(),
        bio: body.get("bio"),
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
export default function UpdateStudent() {
    const loaderData = useLoaderData();
    const userId = loaderData.userId;
    const student = loaderData.student[0];

    if (userId) {
        
        return (
            <div className="update-page">
                <Link to="/" className="link-back">
                    Back
                </Link>
                <div>
                    <h1 >Edit</h1>

                    <Form method="post">
                        <input type="hidden" defaultValue={student._id} name="_id" />
                        <label>
                            <input
                                name="name"
                                type="text"
                                placeholder="Name"
                                defaultValue={student.name}
                            />
                        </label>{" "}
                        <br></br>
                        <label>
                            <textarea
                                name="bio"
                                placeholder="Bio"
                                defaultValue={student.bio}
                            ></textarea>
                        </label>{" "}
                        <br></br>
                        <label>
                            <textarea
                                name="profile_img"
                                placeholder="Profile image URL"
                                defaultValue={student.profile_img}
                            ></textarea>
                        </label>{" "}
                        <br></br>
                        <label>
                            <textarea
                                name="linkedin_link"
                                placeholder="Linkedin"
                                defaultValue={student.linkedin_link}
                            ></textarea>
                        </label>{" "}
                        <br></br>
                        <label>
                            <textarea
                                name="website_link"
                                placeholder="Website"
                                defaultValue={student.website_link}
                            ></textarea>
                        </label>{" "}
                        <br></br>
                        <div id="select_tags">
                            <div>
                                <input type="checkbox" id="html" name="tags" value="HTML" />
                                <label htmlFor="html">HTML</label>
                            </div>
                            <div>
                                <input type="checkbox" id="css" name="tags" value="CSS" />
                                <label htmlFor="html">CSS</label>
                            </div>
                            <div>
                                <input type="checkbox" id="javascript" name="tags" value="JavaScript" />
                                <label htmlFor="javascript">JavaScript</label>
                            </div>

                        </div>
                        <br></br>
                        <label className="switch">
                            <input type="checkbox" className="published"></input>
                                <span className="slider round"></span>
                        </label>
                        <p>Make profile public</p>
                        <br></br>
                        <button
                            type="submit"
                        >
                            Save
                        </button>{" "}
                    </Form>
                  
                    {/* delete account button */}
                    <Form method="post">
                        <input
                            type="hidden"
                            name="_id"
                            defaultValue={student._id}
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
