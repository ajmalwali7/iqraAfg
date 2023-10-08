/* eslint-disable react/prop-types */

export function TeacherCard(props) {
  return (
    <a href={`/user/${props.teacher.userID}`}>
      <div className="card bg-secondary text-accent cursor-pointer p-4 hover:opacity-80 hover:shadow-inner">
        <div className="flex gap-2">
          <div className="avatar">
            <div className="w-14 h-14 rounded-full outline outline-2 outline-primary">
              <img
                src={
                  props.teacher.photo
                    ? `${props.teacher.photo}`
                    : `/imgs/user-imgs/default.png`
                }
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="card-title">
              {`${props.teacher.firstName}`[0].toUpperCase() +
                `${props.teacher.firstName}`.substring(1) +
                " " +
                `${props.teacher.lastName}`[0].toUpperCase() +
                `${props.teacher.lastName}`.substring(1)}
            </h1>
            <span className="text-sm">ID: {props.teacher.userID}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
