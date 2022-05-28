import { useLoaderData, Link, Form } from "@remix-run/react";
import { requireUserSession } from "~/sessions.server";

import connectDb from "~/db/connectDb.server";


export async function loader({ request }) {
  const db = await connectDb();
  const url = new URL(request.url);
  //const session = await requireUserSession(request);

  //const userId = session.get("userId");

  //  search
  var searchParams = {};
  const searchQuery = url.searchParams.get("searchQuery");
  if (searchQuery != null && searchQuery != "") {
    searchParams.name = { $regex: searchQuery };
  }

  

  
 
  
 
  const students = await db.models.Students.find(searchParams);

  // filter
  let checked_tags = url.searchParams.getAll("tags");
  var fitleredStudents = students;
   
  checked_tags.forEach((value)=>{

      fitleredStudents = fitleredStudents.filter((student)=>{

        return (student.tags.indexOf(value) > -1);

      });
  });
  


  return fitleredStudents;
}

export default function Index() {
  var students = useLoaderData();

  return (
    <div className="home-page">

      <Form method="GET" className="">
          <input
            type="text"
            name="searchQuery"
            id="myInput"
            placeholder="Search"
            title="search"
          ></input>
          <button
            type="submit"
          >
            search
          </button>
        </Form>
        <Form method="GET" className="">
        

        <div id="select_tags">
                            <div>
                                <input type="checkbox" id="html" name="tags" value="HTML" />
                                <label htmlFor="html">HTML</label>
                            </div>
                            <div>
                                <input type="checkbox" id="css" name="tags" value="CSS"  />
                                <label htmlFor="html">CSS</label>
                            </div>
                            <div>
                                <input type="checkbox" id="javascript" name="tags" value="JavaScript"  />
                                <label htmlFor="javascript">JavaScript</label>
                            </div>

                        </div>
          <button
            type="submit"
          >
            filter
          </button>
        </Form>



      <div id="list-id">
        {students.filter(student => student.published == "on").map((student) => {
          
          return (
            <div
              key={student._id}
            
              className="student-item"
            >

              <img src={student.profile_img} alt="Profile" />  

              <div className="info-wrapper">
                <p className="student-name">{student.name}</p>
                <p>{student.bio}</p>

                <div className="tags-wrapper">
                  
                  {student.tags.slice(0, 6).map((tag) => {
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

                  <p>Created: {student.date}</p>

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
