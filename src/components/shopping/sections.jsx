import React, { useState, useEffect } from "react";
import http from "../../services/httpService";

function Sections(props) {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    async function getSections() {
      const result = await http.get("/shopping/sections/");
      setSections(result.data);
    }
    getSections();
  }, []);

  const renderSections = () => {
    return sections.map((section) => (
      <li key={section.id}>
        {section.id} - <strong>{section.name}</strong>
      </li>
    ));
  };

  return (
    <div>
      <h2>Sections</h2>
      <ul>{renderSections()}</ul>
    </div>
  );
}

export default Sections;
