import { JobType } from "../../hooks/useAdzuna";
import HomeJobCard from "./HomeJobCard";

interface props {
  isLoading: boolean;
  jobs: JobType[];
  error: any;
}

const HomeJobCards = (props: props) => {
  const { isLoading, jobs, error } = props;

  if (error) return <p>There was an error rendering the cards</p>;

  const renderJobCards = () => {
    return (
      <div className="space-y-4 border-t pt-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          jobs.map((el: JobType, index: number) => {
            return <HomeJobCard el={el} key={index} />;
          })
        )}
      </div>
    );
  };

  return <div>{renderJobCards()}</div>;
};

export default HomeJobCards;
