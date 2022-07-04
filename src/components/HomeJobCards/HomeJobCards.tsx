import { AiFillApple } from "react-icons/ai";

type JobType = {
  title: string;
  location: {
    __CLASS__: string;
    display_name: string;
  };
  description: string;
  salary_max: number;
  company: {
    __CLASS__: string;
    display_name: string;
  };
  contract_type: string;
};

interface props {
  isLoading: boolean;
  jobs: JobType[];
  error: unknown;
}

const HomeJobCards = (props: props) => {
  const { isLoading, jobs } = props;

  // SHOW SKELETON WHILE ITEMS ARE LOADING
  // const renderLoading = () => {};
  const renderJobCards = () => {
    return (
      <div className="space-y-4 border-t pt-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          jobs.map((el, index) => {
            return (
              <div
                key={index}
                className="border flex hover:cursor-pointer hover:shadow px-3 py-2 rounded border-l-4"
              >
                <div className="flex justify-center items-center mr-4">
                  <AiFillApple size="3rem" />
                </div>
                <div className="flex flex-col justify-center pt-2">
                  <h5 className="text-2xl tracking-tight text-gray-900">
                    {el.title}
                  </h5>
                  <p className="opacity-50 text-lg">
                    {el.company.display_name}
                  </p>
                </div>
                <div className="flex flex-col text-right ml-auto">
                  <h6 className="font-bold tracking-wide text-sky-400">
                    {el.location.display_name}
                  </h6>
                  <p>£{el.salary_max}</p>
                  <p className="text-green-500 font-bold uppercase text-sm">
                    {el.contract_type && el.contract_type.replace("_", "-")}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  };

  return <div>{renderJobCards()}</div>;
};

export default HomeJobCards;
