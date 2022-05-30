import { useLoaderData, Link, Form } from "@remix-run/react";
import { requireUserSession, getSession } from "~/sessions.server";

import connectDb from "~/db/connectDb.server";


 
export async function loader({ request }) {  

    const session = await getSession(request.headers.get("Cookie"));
        const userId = session.get("userId");
        console.log(userId);
        const db = await connectDb();

        const company = await db.models.Companies.findOne({
            userId: userId
        });

        const students = db.models.Students.find({
            published: "on",
            _id : { $in: company.favourite}
        });
  
      return students;
  }

export default function Favourites() {
  var students = useLoaderData();

  return (
    <div className="home-page">
 


      <div id="list-id" className="students-grid">
        {students.map((student) => {
          
          return (
            <div
              key={student._id}
            
              className="student-item"
            >

              <img src={student.profile_img} alt="Profile" />  

              <div className="info-wrapper">
                <p className="student-name">{student.name}</p>
                <p className="line-clamp">{student.bio}</p>

                <div className="tags-wrapper">
                  
                  {student.tags.slice(0, 3).map((tag) => {
                    return (
                      <div
                        key={tag}
                        className="tag-item"
                      >
                        <p>{tag}</p>
                      </div>)

                  })}
                </div>

                <div className="student-item-footer">

                  <p>Created: {student.date.substring(0, 10)}</p>

                  <Link to={"/profile/" + student._id}>Read more</Link>
                </div>
              </div>

            </div>
          );
        })}
      </div>


    </div>
  );
}
