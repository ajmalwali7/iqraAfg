export function PrivacyPolicy() {
  return (
    <div className="text-primary card shadow-xl mt-2 m-3 p-5 md:p-9 bg-accent overflow-x-hidden h-fit lg:mt-9 lg:m-11">
      <h1 className="font-bold text-lg md:text-2xl my-5">
        Privacy Policy for IQRA AFGHANISTAN
      </h1>
      <p>Effective Date: 03 Sep 2023</p>
      <ol className="flex flex-col gap-7 m-10 mx-0 lg:mx-4">
        <li>
          <h3 className="font-semibold text-base md:text-xl">
            1 - Introduction
          </h3>
          <p className="pl-4 py-3 ">{`Welcome to IQRA AFGHANISTAN ("we," "us," or "our"). At IQRA AFGHANISTAN, we are committed to protecting your privacy and ensuring the security of your personal data. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our web application.`}</p>
        </li>
        <li>
          <h3 className="font-semibold text-base md:text-xl">
            2 - Information We Collect
          </h3>
          <p className="pl-4 py-3 ">{`We collect the following types of information from users of our web app:`}</p>
          <ol className="pl-4 pb-3">
            <li>
              <h4 className="font-medium text-base md:text-lg">
                2.1 Student Data
              </h4>
              <ul>
                <li className=" before:content-['•'] before:mx-4 before:text-xl before:font-medium">{`Personal Information: We collect students' personal data, including but not limited to names, email addresses, and student IDs, for the purpose of logging them into our system.`}</li>
                <li className=" before:content-['•'] before:mx-4 before:text-xl before:font-medium">{`Academic Data: We may collect academic information such as
              courses, assignments, and grades to provide educational services
              and enhance the user experience within our platform.`}</li>
              </ul>
            </li>
            <li className="pt-3">
              <h4 className="font-medium text-base md:text-lg">
                2.2 Teacher Data
              </h4>
              <ul>
                <li className=" before:content-['•'] before:mx-4 before:text-xl before:font-medium">{`Personal Information: We collect teachers' personal data, including names, email addresses, and teacher IDs, for the purpose of logging them into our system.`}</li>
                <li className=" before:content-['•'] before:mx-4 before:text-xl before:font-medium">{`Academic Data: We may collect information related to teachers' courses and assignments for the purpose of facilitating their role within the system.`}</li>
              </ul>
            </li>
          </ol>
        </li>
        <li>
          <h3 className="font-semibold text-base md:text-xl">
            3 - Use of Personal Data
          </h3>
          <p className="pl-4 py-3 ">{`We use the collected personal data for the following purposes:`}</p>
          <ol className="pl-4 pb-3">
            <li className=" before:content-['•'] before:mx-4 before:text-xl before:font-medium">
              {`To facilitate user authentication and provide access to the web app for both students and teachers.`}
            </li>
            <li className=" before:content-['•'] before:mx-4 before:text-xl before:font-medium">
              {`To improve and personalize the user experience within our platform.`}
            </li>
            <li className=" before:content-['•'] before:mx-4 before:text-xl before:font-medium">{`To provide educational services and support.`}</li>
            <li className=" before:content-['•'] before:mx-4 before:text-xl before:font-medium">
              {`To communicate with users regarding updates, changes, or important information related to our web app.`}
            </li>
            <li className=" before:content-['•'] before:mx-4 before:text-xl before:font-medium">{`To ensure the security and integrity of our web app.`}</li>
          </ol>
        </li>
        <li>
          <h3 className="font-semibold text-base md:text-xl">
            4 - Data Sharing and Disclosure
          </h3>
          <p className="pl-4 py-3 ">{`We do not share personal data with teachers or students. The data collected is solely used for the purposes mentioned above and is not disclosed to any third party or unauthorized individuals.`}</p>
        </li>
        <li>
          <h3 className="font-semibold text-base md:text-xl">
            5 - Data Security
          </h3>
          <p className="pl-4 py-3 ">{`We take the security of your personal data seriously and implement appropriate measures to protect it from unauthorized access, disclosure, alteration, or destruction. However, no data transmission over the internet is completely secure, and we cannot guarantee the absolute security of your information.`}</p>
        </li>
        <li>
          <h3 className="font-semibold text-base md:text-xl">
            6 - Your Rights
          </h3>
          <p className="pl-4 py-3 ">{`You have the right to access, update, or delete your personal data. If you wish to exercise these rights or have any questions about your personal data, please contact us at info@iqraafg.edu`}</p>
        </li>
        <li>
          <h3 className="font-semibold text-base md:text-xl">
            7 - Changes to this Privacy Policy
          </h3>
          <p className="pl-4 py-3 ">{`We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes through our web app or by other means as required by applicable law.`}</p>
        </li>
        <li>
          <h3 className="font-semibold text-base md:text-xl">8 - Contact Us</h3>
          <p className="pl-4 py-3 ">{`If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your personal data, please contact us at info@iqraafg.com`}</p>
        </li>
      </ol>
      <p className="text-lg">{`By using IQRA AFGHANISTAN, you agree to this Privacy Policy.`}</p>
      <ul className="my-10">
        <li className="font-bold text-lg">IQRA AFGHANISTAN</li>
        <li className="underline hover:opacity-50">
          <a href="www.iqraafg.com" rel="noreferrer" target="_blank">
            www.iqraafg.com
          </a>
        </li>
        <li>contact@iqraafg.com</li>
      </ul>
    </div>
  );
}
