import { GrFormNext } from "react-icons/gr";
import { NavLink } from "react-router-dom";

interface pathDetails {
  breadcrumbs: { title: string; link: string }[];
}

const Breadcrumbs = ({ breadcrumbs }: pathDetails) => {
  return (
    <div className="flex space-x-2 items-center justify-center my-12">
      {breadcrumbs.map((el, index) => {
        return (
          <div key={index} className="flex items-center justify-center">
            <NavLink
              to={el.link}
              className="opacity-50 text-xs uppercase tracking-widest mt-1"
            >
              {el.title}
            </NavLink>
            {index === breadcrumbs.length - 1 ? (
              <></>
            ) : (
              <GrFormNext size={"1.3rem"} className="opacity-50 ml-2" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
