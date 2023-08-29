/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export function CourseCard(props) {
  return (
    <a href={`/course/${props.course.slug}`}>
      <div className="card bg-secondary text-accent cursor-pointer p-4 hover:opacity-80 h-fit">
        <div className="flex justify-between">
          <div>
            <h1 className="card-title">
              {`${props.course.title}`[0].toUpperCase() +
                `${props.course.title}`.substring(1)}
            </h1>
            <div className="flex flex-col">
              <p className="text-sm">
                {`${props.course.subject}`[0].toUpperCase() +
                  `${props.course.subject}`.substring(1)}
              </p>
              <div className="flex gap-1 items-end text-xs">
                {`Rating: ${props.course.ratingsAverage}`}
                <FontAwesomeIcon icon={faStar} className="pb-1" />
              </div>
            </div>
          </div>
          <p className="text-5xl font-medium">{`${props.course.class}`}</p>
        </div>
        <p className="card-body py-5 px-0 text-sm">
          {`${props.course.description}`.substring(0, 150)}
        </p>
        <div className="flex flex-col text-xs">
          <p>
            {`Teacher: ` +
              `${props.course.teacher.firstName}`[0].toUpperCase() +
              `${props.course.teacher.firstName}`.substring(1) +
              " " +
              `${props.course.teacher.lastName}`[0].toUpperCase() +
              `${props.course.teacher.lastName}`.substring(1)}
          </p>
          <p>{`Uploaded: ${props.course.createdAt}`.split("T")[0]}</p>
        </div>
      </div>
    </a>
  );
}
