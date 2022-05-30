import { useLoaderData, Link, Form } from "@remix-run/react";
import { requireUserSession } from "~/sessions.server";

import connectDb from "~/db/connectDb.server";


export async function loader({ request }) {
  const db = await connectDb();
  const url = new URL(request.url); 

  //  search
  var searchParams = {};
  const searchQuery = url.searchParams.get("searchQuery");
  if (searchQuery != null && searchQuery != "") {
    searchParams.name = { $regex: searchQuery, $options:"i" }; 
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

      <Form method="GET"  className="search">
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
 <svg xmlns="http://www.w3.org/2000/svg" width="19.16" height="19.16" viewBox="0 0 19.16 19.16">
  <g id="Icon_feather-search" data-name="Icon feather-search" transform="translate(-3.5 -3.5)">
    <path id="Path_816" data-name="Path 816" d="M19.385,11.943A7.443,7.443,0,1,1,11.943,4.5a7.443,7.443,0,0,1,7.443,7.443Z" transform="translate(0 0)" fill="none" stroke="#5e5e5e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
    <path id="Path_817" data-name="Path 817" d="M29.022,29.022l-4.047-4.047" transform="translate(-7.776 -7.776)" fill="none" stroke="#5e5e5e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
  </g>
</svg>



          </button>
        </Form>
        <Form method="GET" className="filter">
        

        <div id="select_tags" className="filter-grid">
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
                            <div>
                                <input type="checkbox" id="react" name="tags" value="React"  />
                                <label htmlFor="react">React</label>
                            </div>
                            <div>
                                <input type="checkbox" id="angular" name="tags" value="Angular" />
                                <label htmlFor="angular">Angular</label>
                            </div>
                            <div>
                                <input type="checkbox" id="vue" name="tags" value="Vue.js"  />
                                <label htmlFor="vue">Vue.js</label>
                            </div>
                            <div>
                                <input type="checkbox" id="remix" name="tags" value="Remix"  />
                                <label htmlFor="remix">Remix</label>
                            </div>
                            <div>
                                <input type="checkbox" id="python" name="tags" value="Python"  />
                                <label htmlFor="python">Python</label>
                            </div>
                            <div>
                                <input type="checkbox" id="bootstrap" name="tags" value="Bootstrap"  />
                                <label htmlFor="bootstrap">Bootstrap</label>
                            </div>
                            <div>
                                <input type="checkbox" id="tailwind" name="tags" value="Tailwind" />
                                <label htmlFor="tailwind">Tailwind</label>
                            </div>
                            <div>
                                <input type="checkbox" id="php" name="tags" value="PHP" />
                                <label htmlFor="php">PHP</label>
                            </div>
                            <div>
                                <input type="checkbox" id="ionic" name="tags" value="Ionic"  />
                                <label htmlFor="ionic">Ionic</label>
                            </div>
                            <div>
                                <input type="checkbox" id="mongodb" name="tags" value="MongoDB"  />
                                <label htmlFor="mongodb">MongoDB</label>
                            </div>
                            <div>
                                <input type="checkbox" id="mysql" name="tags" value="MySQL"  />
                                <label htmlFor="mysql">MySQL</label>
                            </div>
                            <div>
                                <input type="checkbox" id="firebase" name="tags" value="Firebase" />
                                <label htmlFor="firebase">Firebase</label>
                            </div>

                        </div>
          <button
            type="submit"
          >
            filter
          </button>
        </Form>



      <div id="list-id" className="students-grid">
        {students.filter(student => student.published == "on").map((student) => {
          
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
