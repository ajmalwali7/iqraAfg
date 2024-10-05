/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export function CourseCard(props) {
  const c = props.course;
  return (
    <a href={`/course/${c.slug}`}>
      <div className="card rounded-xl lg:rounded-2xl bg-secondary text-accent cursor-pointer p-2 lg:p-4 hover:opacity-80 hover:shadow-md h-fit">
        <div className="flex justify-between">
          <div>
            <h1 className="card-title text-sm lg:text-xl">
              {`${c.title}`[0].toUpperCase() + `${c.title}`.substring(1)}
            </h1>
            <div className="flex flex-col">
              <p className="text-sm">
                {`${c.subject}`[0].toUpperCase() + `${c.subject}`.substring(1)}
              </p>
              <div className="flex gap-1 items-end text-xs">
                {`Rating: ${c.ratingsAverage}`}
                <FontAwesomeIcon icon={faStar} className="pb-1" />
              </div>
            </div>
          </div>
          <p className="text-3xl lg:text-5xl font-medium">{`${c.class}`}</p>
        </div>
        <p className="card-body py-2 lg:py-5 px-0 text-sm">
          {`${c.description}`.substring(0, 150)}
        </p>
        <div className="flex flex-col text-xs">
          <p>
            {`Teacher: ` +
              `${c.teacher.firstName}`[0].toUpperCase() +
              `${c.teacher.firstName}`.substring(1) +
              " " +
              `${c.teacher.lastName}`[0].toUpperCase() +
              `${c.teacher.lastName}`.substring(1)}
          </p>
          <p>{`Uploaded: ${c.createdAt}`.split("T")[0]}</p>
        </div>
      </div>
    </a>
  );
}
