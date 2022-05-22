import { redirect } from "@remix-run/node";
import { Link, Form, useLoaderData } from "@remix-run/react";
import connectDb from "~/db/connectDb.server";
import { requireUserSession } from "~/sessions.server";
export async function loader({ params }) {
    const db = await connectDb();
    const student = await db.models.Students.findById(params.studentId);

    return student;
}
export async function action({ request }) {
    const session = await requireUserSession(request);

    const body = await request.formData();
    var id = body.get("_id");
    var action = body.get("action");

    //favourite update for company
    // if (action == "fav_update") {
    //     const db = await connectDb();
    //     const student = await db.models.Students.findById(id);

    //     var model = {
    //       favourite: !student.favourite,
    //     };

    //     db.models.Students.findByIdAndUpdate(id, model).exec();
    //     return redirect("/students/" + id);
    //   } 
    //   return null;
}

export default function Index() {


    const student = useLoaderData();
    var favButtonClassName = "#464646";
    if (student.favourite == true) {
        favButtonClassName = "#1e8e8c";
    }

    return (
        <div
            id="content-section"
            className="md:w-[68%] w-full flex flex-col  h-full overflow-y-auto "
        >
            <Link to="/" className="inline-block mt-3 p-5 font-bold underline ">
                Back
            </Link>
            <div key={student._id}>
                <div className=" flex flex-col md:m-12 m-4 ">
                    <h1 className=" mb-5 ">{student.name}</h1>
                    <p className=" mb-12 font-medium ">{student.bio}</p>
                    <p className=" mb-12 font-medium ">{student.tags}</p>

                    

                    <div className=" fixed bottom-5 md:right-5 left-[11%] md:left-auto flex ">
                        <Form method="post">
                            <input
                                type="hidden"
                                name="_id"
                                defaultValue={student._id}
                            ></input>
                            <button
                                type="submit"
                                name="action"
                                value="fav_update"
                                id="fav_icon"
                                style={{ backgroundColor: favButtonClassName }}
                                className={` ml-3 md:py-3 md:px-5 py-1 px-3 font-medium shadown-lg shadow-gray-900   rounded-md text-white`}
                            >
                                Favourite &#9733;
                            </button>
                        </Form>


                        <Form method="post">
                            <input
                                type="hidden"
                                name="_id"
                                defaultValue={student._id}
                            ></input>
                            <button
                                type="submit"
                                name="action"
                                value="delete"
                                className=" ml-3 md:py-3 md:px-5 py-1 px-3 font-medium shadown-lg shadow-gray-900 bg-student-emerald rounded-md text-white "
                            >
                                Delete
                            </button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
