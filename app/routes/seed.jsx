import { redirect, json } from "@remix-run/node";
import { Form, useLoaderData, Link } from "@remix-run/react";
import connectDb from "~/db/connectDb.server";
import { requireUserSession, getSession, commitSession } from "~/sessions.server";
import bcrypt from "bcryptjs";




export async function action({ request }) {

    const db = await connectDb();


    const users = await db.models.Users;
    const students = await db.models.Students;
    const companies = await db.models.Companies;



    await users.deleteMany();
    await students.deleteMany();
    await companies.deleteMany();

    var pwd = bcrypt.hashSync("jobportal", 10);


    // user 1
    var newUser = await db.models.Users.create({
        username: "kate@jobportal.com",
        password: pwd,
        user_type: "student",

    });

    var newStudent = await db.models.Students.create({
        userId: newUser._id,
        name: "Kate Meowsy",
        date: new Date(),
        bio: "Phasellus porttitor nunc vel ex rutrum hendrerit. Pellentesque vitae mi metus. Nullam et viverra leo. Nullam diam urna, scelerisque sit amet rutrum finibus, pulvinar eget leo. Fusce ac ligula sed ante condimentum tincidunt. Maecenas faucibus quam vel finibus condimentum. Aliquam sagittis ultricies dignissim. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin ullamcorper quam eu placerat ornare. Proin at diam feugiat, ultrices nunc ac, molestie odio. In bibendum convallis turpis, et iaculis urna laoreet eget. Integer laoreet turpis ut purus pharetra mollis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum condimentum turpis vitae nulla vestibulum efficitur ut quis nunc. Sed sodales neque vel leo pellentesque, quis aliquam lorem sollicitudin.",
        profile_img: "https://www.thevetonfourth.com/wp-content/uploads/2019/12/cat-looking-up.jpg",
        tags: ["HTML", "CSS", "JavaScript", "React", "Angular", "Vue.js", "Remix", "Python", "Bootstrap", "Tailwind", "PHP", "Ionic", "MongoDB", "MySQL", "Firebase"],
        linkedin_link: "https://www.linkedin.com/feed/",
        website_link: "https://www.google.com/",
        published: "on",
    });

    // user 2
    newUser = await db.models.Users.create({
        username: "john@jobportal.com",
        password: pwd,
        user_type: "student",

    });

    newStudent = await db.models.Students.create({
        userId: newUser._id,
        name: "John Paws",
        date: new Date(),
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel elementum massa. Duis dapibus odio quis mi dictum, vitae pellentesque justo feugiat. Nunc pharetra tortor eros, et ultrices nibh tempus nec. Duis sollicitudin dolor at nibh auctor euismod. Donec euismod ullamcorper diam quis faucibus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla lacinia, enim non molestie volutpat, tellus ante finibus nunc, vel rutrum enim leo convallis metus. ",
        profile_img: "https://media.wired.co.uk/photos/60c8730fa81eb7f50b44037e/3:2/w_3329,h_2219,c_limit/1521-WIRED-Cat.jpeg",
        tags: ["HTML", "CSS", "JavaScript", "Vue.js", "Remix", "Python", "Bootstrap", "Ionic", "MongoDB", "MySQL"],
        linkedin_link: "https://www.linkedin.com/feed/",
        website_link: "https://www.google.com/",
        published: "on",
    });

    // user 3
    newUser = await db.models.Users.create({
        username: "louise@jobportal.com",
        password: pwd,
        user_type: "student",

    });

    newStudent = await db.models.Students.create({
        userId: newUser._id,
        name: "Louise Fluff",
        date: new Date(),
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel elementum massa. Duis dapibus odio quis mi dictum, vitae pellentesque justo feugiat. Nunc pharetra tortor eros, et ultrices nibh tempus nec. Duis sollicitudin dolor at nibh auctor euismod. Donec euismod ullamcorper diam quis faucibus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla lacinia, enim non molestie volutpat, tellus ante finibus nunc, vel rutrum enim leo convallis metus. Quisque hendrerit suscipit varius. Nunc ut odio nec quam condimentum porttitor id eu felis. Nam lacinia, turpis id faucibus semper, diam enim suscipit est, semper dapibus urna justo nec dui. Vivamus ultricies neque arcu. In hac habitasse platea dictumst. Nulla ipsum nibh, pretium sed imperdiet at, pretium nec nisl.",
        profile_img: "https://media.npr.org/assets/img/2021/08/11/gettyimages-1279899488_wide-e28def62c2d01ee6368d9aa312c68998415b5e72-s1100-c50.jpg",
        tags: ["HTML", "CSS", "JavaScript", "Remix", "Python", "Bootstrap", "Tailwind", "PHP", "Ionic", "MySQL", "Firebase"],
        linkedin_link: "https://www.linkedin.com/feed/",
        website_link: "https://www.google.com/",
        published: "on",
    });

    // user 4
    newUser = await db.models.Users.create({
        username: "Mia@jobportal.com",
        password: pwd,
        user_type: "student",

    });

    newStudent = await db.models.Students.create({
        userId: newUser._id,
        name: "Mia Mittens",
        date: new Date(),
        bio: "Pellentesque ultrices, risus quis dignissim iaculis, metus urna auctor orci, eget elementum ante sapien ac diam. Vestibulum luctus leo quis odio ornare, tincidunt luctus odio porttitor. Maecenas vulputate sapien in consectetur consectetur. Sed sed sollicitudin mauris, id posuere magna. Aenean et tincidunt tellus. Nam sit amet massa tristique, hendrerit diam vitae, suscipit quam. Phasellus a pellentesque tortor, vel interdum ante. Nunc mauris diam, egestas non laoreet quis, pellentesque id odio. Aliquam consequat augue eu leo tincidunt tempus. Suspendisse eget sollicitudin felis. Quisque hendrerit odio sapien, nec sodales mauris luctus non.",
        profile_img: "https://i.pinimg.com/736x/72/87/c1/7287c1e1eb959db791c3a5efb181d3a1.jpg",
        tags: ["HTML", "CSS", "Python", "Bootstrap", "Tailwind", "PHP", "Ionic", "MongoDB", "Firebase"],
        linkedin_link: "https://www.linkedin.com/feed/",
        website_link: "https://www.google.com/",
        published: "on",
    });

    // user 5
    newUser = await db.models.Users.create({
        username: "tom@jobportal.com",
        password: pwd,
        user_type: "student",

    });

    newStudent = await db.models.Students.create({
        userId: newUser._id,
        name: "Tom Beans",
        date: new Date(),
        bio: "Praesent tempor augue nec risus scelerisque, id vestibulum ligula mollis. Nunc interdum est vel justo aliquam, a venenatis augue semper. Cras auctor cursus nunc a lobortis. Vestibulum interdum eu lorem sit amet feugiat. Sed in nunc ut libero rhoncus commodo. Vivamus non tortor non enim mattis iaculis id sed eros. Vestibulum dignissim ultrices metus, ut volutpat nulla molestie et. Nam eget tempus urna, ac porta leo. Vestibulum in diam non eros mattis viverra nec id nunc. In ultrices odio ut urna sodales laoreet. Sed vel sapien ac enim sollicitudin pharetra eget fringilla quam.",
        profile_img: "https://i.pinimg.com/564x/42/9c/58/429c588a0993718a0cb458d2541e3523.jpg",
        tags: ["HTML", "CSS", "JavaScript","Bootstrap", "Tailwind", "PHP", "Ionic"],
        linkedin_link: "https://www.linkedin.com/feed/",
        website_link: "https://www.google.com/",
        published: "on",
    });
    // user 6
    newUser = await db.models.Users.create({
        username: "luna@jobportal.com",
        password: pwd,
        user_type: "student",

    });

    newStudent = await db.models.Students.create({
        userId: newUser._id,
        name: "Luna Sniffs",
        date: new Date(),
        bio: "Donec suscipit ornare metus. Integer in nisl elementum, porta nisl eu, laoreet felis. Duis id tellus cursus, venenatis diam id, condimentum quam. Sed felis tortor, convallis ac quam at, laoreet condimentum tellus. Mauris condimentum risus eget turpis porta, et volutpat diam rhoncus. Nullam tellus dui, lacinia in massa a, venenatis cursus est. Morbi ullamcorper quis elit non vestibulum. Etiam facilisis sapien sodales dapibus tincidunt. Sed massa ante, congue ac finibus vitae, finibus non tortor. Curabitur ut nunc pellentesque elit aliquet consectetur ac vitae dolor. Cras in leo fringilla, gravida dolor a, luctus augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        profile_img: "https://i.pinimg.com/564x/0f/79/ff/0f79ff5eca49d9b28bb55b328ab42b44.jpg",
        tags: ["Remix", "Python", "Bootstrap", "Tailwind", "MySQL", "Firebase"],
        linkedin_link: "https://www.linkedin.com/feed/",
        website_link: "https://www.google.com/",
        published: "on",
    });
    // user 7
    newUser = await db.models.Users.create({
        username: "Marco@jobportal.com",
        password: pwd,
        user_type: "student",

    });

    newStudent = await db.models.Students.create({
        userId: newUser._id,
        name: "Marco Whiskers",
        date: new Date(),
        bio: "Sed sed sollicitudin mauris, id posuere magna. Aenean et tincidunt tellus. Nam sit amet massa tristique, hendrerit diam vitae, suscipit quam. Phasellus a pellentesque tortor, vel interdum ante. Nunc mauris diam, egestas non laoreet quis, pellentesque id odio. ",
        profile_img: "https://i.pinimg.com/564x/fc/e6/e8/fce6e8027482352ebddeda2a061b35f7.jpg",
        tags: [ "CSS", "JavaScript", "React", "Remix", "Python", "Bootstrap","Ionic", "MongoDB", "MySQL"],
        linkedin_link: "https://www.linkedin.com/feed/",
        website_link: "https://www.google.com/",
        published: "on",
    });
    // user 8
    newUser = await db.models.Users.create({
        username: "harry@jobportal.com",
        password: pwd,
        user_type: "student",

    });

    newStudent = await db.models.Students.create({
        userId: newUser._id,
        name: "Harry Chonks",
        date: new Date(),
        bio: "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla lacinia, enim non molestie volutpat, tellus ante finibus nunc, vel rutrum enim leo convallis metus. Quisque hendrerit suscipit varius. Nunc ut odio nec quam condimentum porttitor id eu felis. ",
        profile_img: "https://i.pinimg.com/564x/5e/21/b5/5e21b5fa45cc04f8fd35537496ebe6d0.jpg",
        tags: ["HTML", "CSS", "Bootstrap", "Tailwind", "PHP", "Ionic"],
        linkedin_link: "https://www.linkedin.com/feed/",
        website_link: "https://www.google.com/",
        published: "on",
    });
    // user 9
    newUser = await db.models.Users.create({
        username: "sophie@jobportal.com",
        password: pwd,
        user_type: "student",

    });

    newStudent = await db.models.Students.create({
        userId: newUser._id,
        name: "Sophie Fangs",
        date: new Date(),
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum condimentum turpis vitae nulla vestibulum efficitur ut quis nunc. Sed sodales neque vel leo pellentesque, quis aliquam lorem sollicitudin.",
        profile_img: "https://i.pinimg.com/564x/0d/82/27/0d82275de9203523c4b1b29a78dd8fa1.jpg",
        tags: ["HTML", "Angular", "Vue.js", "Remix", "Ionic", "MongoDB", "MySQL", "Firebase"],
        linkedin_link: "https://www.linkedin.com/feed/",
        website_link: "https://www.google.com/",
        published: "on",
    });
    // user 10
    newUser = await db.models.Users.create({
        username: "andy@jobportal.com",
        password: pwd,
        user_type: "student",

    });

    newStudent = await db.models.Students.create({
        userId: newUser._id,
        name: "Andy Munchkin",
        date: new Date(),
        bio: "Curabitur ut nunc pellentesque elit aliquet consectetur ac vitae dolor. Cras in leo fringilla, gravida dolor a, luctus augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        profile_img: "https://i.pinimg.com/originals/da/8e/16/da8e16bfeae7d2cf673b4dfd8194599a.jpg",
        tags: ["HTML", "CSS", "JavaScript", "React", "Vue.js", "Remix", "Bootstrap"],
        linkedin_link: "https://www.linkedin.com/feed/",
        website_link: "https://www.google.com/",
        published: "on",
    });





    return redirect("/logout");
}



export default function Seed() {
    return (
        <div className="seed-page">
            <Form method="POST" className="">

                <button
                    type="submit"
                >
                    Seed the database
                </button>
            </Form>

            <h3>To log in you can use following emails:</h3>
            <p>
                kate@jobportal.com<br />
                john@jobportal.com<br />
                louise@jobportal.com<br />
            </p>
            <p>Password is always "jobportal" </p>
        </div>


    )
}