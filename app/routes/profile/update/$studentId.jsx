import { redirect, json } from "@remix-run/node";
import { Form, useLoaderData, Link } from "@remix-run/react";
import connectDb from "~/db/connectDb.server";
import { requireUserSession } from "~/sessions.server";

export async function loader({ params, request }) {
    const db = await connectDb();
    const url = new URL(request.url);
    const student = await db.models.students.findById(params._id);
    const session = await requireUserSession(request);

    return json({ userId: session.get("userId"), student });
}

export async function action({ request }) {
    const session = await requireUserSession(request);
    const body = await request.formData();
    const db = await connectDb();

    var id = body.get("_id");
    var model = {
        name: body.get("name"),
        date: new Date(),
        bio: body.get("bio"),
        tags: body.get("tags"),
        linkedin_link: body.get("linkedin_link"),
        website_link: body.get("website_link"),
        userId: session.get("userId"),
    };
    try {
        await db.models.Students.findByIdAndUpdate(id, model).exec();
        return redirect("/students/" + id);
    } catch (error) {
        return json(
            { errors: error.errors, values: Object.fromEntries(body) },
            { status: 400 }
        );
    }
}
export default function UpdateStudent() {
    const { student } = useLoaderData();
    const { userId } = useLoaderData();
    if (userId) {
        return (
            <div className=" md:w-[68%] w-full flex flex-col h-full overflow-y-auto ">
                <Link to="/" className="inline-block mt-3 p-5 font-bold underline ">
                    Back
                </Link>
                <div className=" flex flex-col md:m-12 m-4 ">
                    <h1 className=" mb-12 text-2xl font-medium ">Edit</h1>

                    <Form method="post">
                        <input type="hidden" value={student._id} name="_id" />
                        <label>
                            <input
                                name="name"
                                type="text"
                                placeholder="Name"
                                defaultValue={student.name}
                                className=" md:p-4 p-2 rounded-lg flex w-[95%] shadow-inner shadow-gray-800 bg-snippet-dark-1"
                            />
                        </label>{" "}
                        <br></br>
                        <label>
                            <textarea
                                name="bio"
                                placeholder="Bio"
                                defaultValue={student.bio}
                                className=" md:p-4 p-2 rounded-lg flex w-[95%] shadow-inner shadow-gray-800 bg-snippet-dark-1"
                            ></textarea>
                        </label>{" "}
                        <br></br>
                        <label>
                            <textarea
                                name="linkedin_link"
                                placeholder="Linkedin"
                                defaultValue={student.linkedin_link}
                                className=" md:p-4 p-2 rounded-lg flex w-[95%] shadow-inner shadow-gray-800 bg-snippet-dark-1"
                            ></textarea>
                        </label>{" "}
                        <br></br>
                        <label>
                            <textarea
                                name="website_link"
                                placeholder="Website"
                                defaultValue={student.website_link}
                                className=" md:p-4 p-2 rounded-lg flex w-[95%] shadow-inner shadow-gray-800 bg-snippet-dark-1"
                            ></textarea>
                        </label>{" "}
                        <br></br>
                        <div id="select_tags">
                            <div>
                                <input type="checkbox" id="html" name="tags" value="HTML" />
                                    <label for="html">HTML</label>
                            </div>
                            <div>
                                <input type="checkbox" id="css" name="tags" value="CSS" />
                                    <label for="html">CSS</label>
                            </div>
                            <div>
                                <input type="checkbox" id="javascript" name="tags" value="JavaScript" />
                                    <label for="javascript">JavaScript</label>
                            </div>

                        </div>
                        <br></br>
                        <button
                            type="submit"
                            className=" px-5 py-3 bg-white  mr-5 rounded-md text-snippet-dark-0 hover:scale-105 hover:cursor-pointer duration-300 transition-all "
                        >
                            Save
                        </button>{" "}
                        <br></br>
                    </Form>
                </div>
            </div>
        );
    }
}
