import http from "../../services/httpService";
import SimpleForm from "./component/simpleForm";

const Sections = () => {
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
