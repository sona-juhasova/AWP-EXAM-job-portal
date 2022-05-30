import { redirect } from "@remix-run/node";
import { Link, Form, useLoaderData } from "@remix-run/react";
import connectDb from "~/db/connectDb.server";
import { getSession, requireUserSession } from "~/sessions.server";
export async function loader({ params, request }) {
    const db = await connectDb();
    const student = await db.models.Students.findById(params.studentId);

    const session = await getSession(request.headers.get("Cookie"));
    const userId = session.get("userId"); 
    var user = null;
    if (userId) {
        user = await db.models.Users.findById(userId);
        var favourite = false;
        if (user.user_type == "company") {
            const company = await db.models.Companies.findOne({
                userId: userId
            });
            favourite = company.favourite.indexOf(params.studentId) > -1;
        }
    }
    return { student, favourite, user };
}
export async function action({ request }) {
    await requireUserSession(request);

    const body = await request.formData();
    var studentId = body.get("_id");
    var action = body.get("action");


    const db = await connectDb();


    // favourite update for company
    if (action == "fav_update") {
        const session = await getSession(request.headers.get("Cookie"));
        const userId = session.get("userId");
        console.log(userId);




        const company = await db.models.Companies.findOne({
            userId: userId
        });
        console.log(company);

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
        db.models.Companies.findByIdAndUpdate(company._id, model).exec();

        return redirect("/profile/" + studentId);
    }
}


export default function Index() {

    const { student, favourite, user } = useLoaderData();
    var favButtonClassName = "#dfdfdf";
    if (favourite == true) {
        favButtonClassName = "#dbebef";
    }
    var favStyle = {};
    if (user) {
        if (user.user_type == "student") {
            favStyle = {
                display: "none"
            };
        }
    } else {
        favStyle = {
            display: "none"
        };
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

                <img src={student.profile_img} alt="Profile image" />

                <div className="info-wrapper">
                    <p className="student-name">{student.name}</p>
                    <p>{student.bio}</p>
                </div>



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






                <div className="favourite-button" style={favStyle}>
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
