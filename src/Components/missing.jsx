import { useSelector } from "react-redux";

export function Missing() {
  const missingPage = useSelector((s) => s.lang.missingPage);
  document.title = "Page Not Found";
  return (
    <>
      <div>
        <h1 className="text-6xl text-teal-600 font-bold">
          {missingPage.notFound}
        </h1>
        <p className="text-4xl text-teal-600">
          {missingPage.redirectHome}{" "}
          <a
            className="underline text-green-500 active:text-green-600 hover:cursor-pointer hover:text-green-400"
            href="/"
          >
            {missingPage.here}
          </a>
        </p>
      </div>
    </>
  );
}
