import { redirect } from "@remix-run/node";
import { Link, Form, useLoaderData } from "@remix-run/react";
import connectDb from "~/db/connectDb.server";
import { getSession, requireUserSession } from "~/sessions.server";
export async function loader({ params, request }) {
    const db = await connectDb();
    const student = await db.models.Students.findById(params.studentId);

    const session = await getSession(request.headers.get("Cookie"));
    const userId = session.get("userId");

    const company = await db.models.Companies.findOne({
        userId: userId
    });
    const favourite = company.favourite.indexOf(params.studentId) > -1;
    return { student, favourite };
}
export async function action({ request }) {
    const session = await requireUserSession(request);

    const body = await request.formData();
    var studentId = body.get("_id");
    var action = body.get("action");



    // favourite update for company
    if (action == "fav_update") {
        const session = await getSession(request.headers.get("Cookie"));
        const userId = session.get("userId");
        console.log(userId);
        const db = await connectDb();

        const company = await db.models.Companies.findOne({
            userId: userId
        });
        console.log(company);
        // var model = {
        //     favourite: student._id
        // };
        var model = {};
        if (company.favourite.indexOf(studentId) > -1) {
            //removefrom fauvorites 
            model = {
                $pull: { favourite: studentId }
            };
        } else {
            model = {
                $push: { favourite: studentId }
            };
        }


        // db.models.Companies.updateOne( 
        //     { $push: { favourite: student._id } }
        //  ).exec();



        db.models.Companies.findByIdAndUpdate(company._id, model).exec();

        return redirect("/profile/" + studentId);

    }
    return null;
}

export default function Index() {

    const { student, favourite } = useLoaderData();
    var favButtonClassName = "#464646";
    if (favourite == true) {
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


                    <p>Created: {student.date.substring(0, 10)}</p>
                </div>





                <div className="">
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

                        >
                            Favourite &#9733;
                        </button>
                    </Form>



                </div>

            </div>
        </div>
    );
}
