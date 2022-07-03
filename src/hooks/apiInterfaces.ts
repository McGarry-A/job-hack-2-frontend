export interface JobInterface {
  salary_min: number;
  location: {
    __CLASS__: string;
    area: string[];
    display_name: string;
  };
  salary_is_predicted: number;
  description: string;
  __CLASS__: string;
  created: string;
  redirect_url: string;
  contract_time: string;
  title: string;
  category: {
    __CLASS__: string;
    label: string;
    tag: string;
  };
  id: string;
  salary_max: number;
  company: {
    __CLASS__: string;
    display_name: string;
  };
  contract_type: string;
}

export interface ApiInterface {
    __CLASS__: string;
    results: JobInterface[]
}
