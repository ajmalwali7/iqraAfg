import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard as faClipboardReg,
  faFileClipboard,
  faSnowflake,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBookOpenReader,
  faLaptopCode,
  faSchool,
  faBookOpen,
  faAtom,
  faGraduationCap,
  faMicroscope,
  faUserGraduate,
  faAward,
  faPersonChalkboard,
  faPenFancy,
  faPencil,
  faPenClip,
  faBook,
  faBookQuran,
  faBookMedical,
  faClipboard,
  faUserDoctor,
  faFlaskVial,
  faVial,
  faFlask,
  faBoltLightning,
  faSquareRootVariable,
  faInfinity,
  faPercent,
  faPlusMinus,
  faSuperscript,
  faDesktop,
  faBrain,
  faComputerMouse,
  faComputer,
} from "@fortawesome/free-solid-svg-icons";

export function Background() {
  const iconArr = [
    faClipboardReg,
    faFileClipboard,
    faSnowflake,
    faBookOpenReader,
    faLaptopCode,
    faSchool,
    faBookOpen,
    faAtom,
    faGraduationCap,
    faMicroscope,
    faUserGraduate,
    faAward,
    faPersonChalkboard,
    faPenFancy,
    faPencil,
    faPenClip,
    faBook,
    faBookQuran,
    faBookMedical,
    faClipboard,
    faUserDoctor,
    faFlaskVial,
    faVial,
    faFlask,
    faBoltLightning,
    faSquareRootVariable,
    faInfinity,
    faPercent,
    faPlusMinus,
    faSuperscript,
    faDesktop,
    faBrain,
    faComputerMouse,
    faComputer,
  ];
  const rand = () => {
    return Math.floor(Math.random() * 34);
  };
  let k = 0;
  let K = 4000;
  function BackFive() {
    return (
      <div
        className={`text-primary flex flex-row gap-8 text-sm opacity-20 w-screen pt-3 pb-3`}
      >
        {iconArr.map(() => {
          k = k + 1;
          return <FontAwesomeIcon icon={iconArr[rand()]} key={k} />;
        })}
      </div>
    );
  }
  function BackThree() {
    return (
      <div
        className={`text-primary flex flex-row gap-12 text-sm opacity-20 w-screen pt-3 pb-3`}
      >
        {iconArr.map(() => {
          k = k + 1;
          return <FontAwesomeIcon icon={iconArr[rand()]} key={k} />;
        })}
      </div>
    );
  }
  const arr = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  return (
    <div className="flex flex-col fixed disabled -z-50">
      {arr.map(() => {
        K = K + 1;
        return (
          <div key={K}>
            <BackFive />
            <BackThree />
          </div>
        );
      })}
    </div>
  );
}
