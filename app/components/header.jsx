
export default function Header({ props }) {

  if (props.userId) {
    //logged in
    if (props.userType === "student") {
      //logged in as student
      return (
        <div>
          <h1>Job portal for Students</h1>
           
          <a href="/">Home</a>
          <a href="/update">Edit profile</a>
          <a href="/seed">Seed</a>
          <a href="/logout">Log out</a>

        </div>
      );

    } else {
      //logged in as company
      return (
        <div>
          <h1>Job portal for Companies</h1>

          <a href="/">Home</a>
          <a href="/favourites">Favourites</a>
          <a href="/seed">Seed</a>
          <a href="/logout">Log out</a>
        </div>
      );

    }

  } else {
    //not logged in
    return (
      <div>

        <h1>Job portal</h1>

        <a href="/">Home</a>
        <a href="/seed">Seed</a>
        <a href="/login">Login</a> <br />
        <a href="/register">Register</a>
      </div>
    );
  }
}
