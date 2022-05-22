import { useLoaderData, Link, Form } from "@remix-run/react";
import { useState } from "react";
import { requireUserSession } from "~/sessions.server";

import connectDb from "~/db/connectDb.server";   

export async function loader({ request }) {
  const db = await connectDb();
  const url = new URL(request.url);
  const session = await requireUserSession(request);

  const userId = session.get("userId"); 

  //  search
  var searchParams = {};
  const searchQuery = url.searchParams.get("searchQuery");
  if (searchQuery != null && searchQuery != "") {
    searchParams.title = { $regex: searchQuery };
  }

  // filter

  const filter = url.searchParams.get("filter_selector");
  let filterParams = {};

  if (filter != null && filter != "") {
    if (filter == "title_az") {
      //  sort title a-z
      filterParams = { title: 1 };
    }
    if (filter == "title_za") {
      //  sort title a-z
      filterParams = { title: -1 };
    }

    if (filter == "last_updated") {
      //  sort by updated
      // searchParams.sort({date: 1});
      filterParams = { date: -1 };
    }
    if (filter == "fav") {
      //  view favourite
      searchParams.favourite = true;
    }
  }
  searchParams.userId = userId;
  const students = await db.models.Students.find(searchParams).sort(
    filterParams
  );
  return students; 
}

export default function Index() {
  var students = useLoaderData();
  const [toggle, setToggle] = useState(false);
  const handleClick = (e) => setToggle(!toggle);
  return (
    <div>

      <h1>list of students here</h1>

      <div id="list-id">
        {students.map((student) => {
          return (
            <div
              key={student._id}
              onClick={handleClick}
              className="w-full flex justify-center items-center hover:shadow-inner duration-300 transition-all hover:cursor-pointer hover:shadow-slate-900 rounded-md text-base p-4 "
            >
              <Link to={"/profile/" + student._id}>{student.name}</Link>
            </div>
          );
        })}
      </div>

     
    </div>
  );
}
