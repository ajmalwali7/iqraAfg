import { Route, Routes } from "react-router-dom";
// , useDispatch
// import { useNavigate } from "react-router-dom";

import { Layout } from "./Components/layout";
import { Signup } from "./Components/sign-up";
import { Login } from "./Components/log-in";
import { Missing } from "./Components/missing";
import { MyHome } from "./Components/myHome";
import { User } from "./Components/user";
import { Settings } from "./Components/settings";
import { Courses } from "./Components/courses";
import { Books } from "./Components/books";
import { Teachers } from "./Components/teachers";
import { Course } from "./Components/course";
import { CreateCourse } from "./Components/createCourse";
import { PrivacyPolicy } from "./Components/privacyPolicy";
import { TermsConditions } from "./Components/termsConditions";
import { VerifyToken } from "./Components/verifyToken";
import { OurPartners } from "./Components/ourPartners";
import { AboutUs } from "./Components/aboutUs";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MyHome />} />
          <Route path="sign-up" element={<Signup />} />
          <Route path="log-in" element={<Login />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:class/:slug" element={<Course />} />
          <Route path="books" element={<Books />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="user/:handle" element={<User />} />
          <Route path="verify-email/:token" element={<VerifyToken />} />
          <Route path="my-settings" element={<Settings />} />
          <Route path="create-course" element={<CreateCourse />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="our-partners" element={<OurPartners />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-conditions" element={<TermsConditions />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </>
  );
}
