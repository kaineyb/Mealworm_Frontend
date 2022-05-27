import { useEffect } from "react";
import http from "../../services/httpService";
import { setTitle } from "./../../snippets/setTitle";
import SimpleForm from "./component/simpleForm";

const Sections = () => {
  useEffect(() => {
    setTitle("Sections");
  }, []);

  return (
    <SimpleForm
      name="sections"
      singularTitle="Section"
      pluralTitle="Sections"
      endpoint={http.sectionsEP}
    />
  );
};

export default Sections;
