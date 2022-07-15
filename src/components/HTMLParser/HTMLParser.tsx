import ReactHtmlParser from "react-html-parser";
import "./index.css"

interface props {
    html: string
}

const HTMLParser = (props: props) => {
  return <div className="jobDesc">{ReactHtmlParser(props.html)}</div>;
};

export default HTMLParser;
