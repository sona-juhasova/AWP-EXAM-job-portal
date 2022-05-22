


// export async function loader({ params }) {
//     const db = await connectDb();
//     const student = await db.models.Students.findById(params.studentId);

//     return student;
// }

export default function Header({props}) { 

  if(props.userId)
  {
    //logged in
    if (props.userType === "student") {
        //logged in as student
        return (
            <div>
                <h1>Hi student {props.userName}</h1>

          <a href="/logout">Log out</a> 
         
            </div>
          );
    
    } else {
        //logged in as company
        return (
            <div>
                <h1>Hi company {props.userName}</h1>


          <a href="/logout">Log out</a> 
            </div>
          );

    }
 
  }else{
      //not logged in
    return (
        <div>
           Not logged in <br/>

          <a href="/login">Login</a> <br />
          <a href="/register">Register</a> 
        </div>
      );  
  }
}
