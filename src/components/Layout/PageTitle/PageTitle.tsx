interface props {
  title: string;
}

const PageTitle = ({ title }: props) => {
  return (
    <div className="my-10 mx-auto text-center">
      <h2 className="text-5xl font-semibold text-slate-700">{title}</h2>
    </div>
  );
};

export default PageTitle;
