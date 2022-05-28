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
            className="profile-page"
        >
            <Link to="/" className="link-back">
                Back
            </Link>
            <div
                key={student._id}
                className="student-item"
            >
                <div className="student-item-top">

                    <img src={student.profile_img} alt="Profile image" />

                    <div className="info-wrapper">
                        <p className="student-name">{student.name}</p>
                        <p>{student.bio}</p>
                    </div>
                </div>
                <div className="student-item-footer">

                    <div className="tags-wrapper">

                        {student.tags.map((tag) => {
                            return (
                                <div
                                    key={tag}
                                    className="tag-item"
                                >
                                    <p>{tag}</p>
                                </div>)

                        })}
                    </div>

                        <a href={student.website_link} rel="noreferrer" className="link-website" target="_blank">Website link</a>
                        <a href={student.linkedin_link} rel="noreferrer" className="link-website" target="_blank">Linkedin link</a>
                    
                     
                    <p>Created: {student.date}</p>
                </div>





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



                </div>

            </div>
        </div>
    );
}
