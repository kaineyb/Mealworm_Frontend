import { Box, Divider, Heading } from "@chakra-ui/react";
import _ from "lodash";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import DataContext from "../../../context/dataContext";
import http from "../../../services/httpService";
import EditableInputSelect from "../../common/editableInputSelect";
import { en } from "./../../../services/textService";
import { setTitle } from "./../../../snippets/setTitle";
import CreateIngredientForm from "./createIngredientForm";

function Ingredients(props) {
  const [ingredients, setIngredients] = useState([]);
  const [sections, setSections] = useState([]);
  const [pending, setPending] = useState([]);

  const context = useContext(DataContext);

  useEffect(() => {
    setTitle("Ingredients");
  }, []);

  useEffect(() => {
    async function getIngredients() {
      const {
        data: { ingredients = [] },
      } = context;
      setIngredients(ingredients);
      // console.log("Side Effect: Ingredients Set");
    }
    getIngredients();
  }, [context]);

  useEffect(() => {
    async function getSections() {
      const {
        data: { sections = [] },
      } = context;
      setSections(sections);
      // console.log("Side Effect: Sections Set");
    }
    getSections();
  }, [context]);

  // Changes any ingredient's section to null if that section no longer exists.
  useEffect(() => {
    setIngredients((currentIngredients) => {
      const copyCurrentIngredients = [...currentIngredients];

      if ((copyCurrentIngredients.length !== 0) & (sections.length !== 0)) {
        const sectionIds = [];
        sections.forEach((item) => sectionIds.push(item.id));

        copyCurrentIngredients.forEach((item) => {
          if (
            (item["section"] !== null) &
            !sectionIds.includes(item["section"])
          ) {
            item["section"] = null;
          }
        });
      }

      return copyCurrentIngredients;
    });
  }, [sections]);

  const handleChangeInput = ({ currentTarget: input }, item) => {
    const index = ingredients.indexOf(item);
    const targetCopy = pending.map((_item) => ({ ..._item }));

    const savedChange = targetCopy.filter(
      (change) => change.sourceIndex === index
    );

    if (savedChange.length === 0) {
      const change = { sourceIndex: index, value: input.value };
      setPending([change, ...targetCopy]);
    } else {
      const unchanged = targetCopy.filter(
        (change) => change.sourceIndex !== index
      );

      savedChange[0]["value"] = input.value;

      setPending([savedChange[0], ...unchanged]);
    }
  };

  const handleChangeSelect = (event, item) => {
    const newValue = parseInt(event.target.value);
    const index = ingredients.indexOf(item);

    const targetCopy = pending.map((_item) => ({ ..._item }));

    const savedChange = targetCopy.filter(
      (change) => change.sourceIndex === index
    );

    if (savedChange.length === 0) {
      const change = { sourceIndex: index, section: newValue };
      setPending([change, ...targetCopy]);
    } else {
      const unchanged = targetCopy.filter(
        (change) => change.sourceIndex !== index
      );

      savedChange[0]["section"] = newValue;

      setPending([savedChange[0], ...unchanged]);
    }
  };

  const toggleEditable = (item) => {
    const index = ingredients.indexOf(item);
    const newArray = [...ingredients];

    if (item.editable) {
      delete newArray[index].editable;
      setIngredients(newArray);
    } else {
      newArray[index].editable = true;
      setIngredients(newArray);
    }
  };

  const handleCancel = (item) => {
    const index = ingredients.indexOf(item);
    const targetCopy = pending.map((_item) => ({ ..._item }));

    const unchanged = targetCopy.filter(
      (change) => change.sourceIndex !== index
    );

    setPending(unchanged);
    toggleEditable(item);
  };

  const handleSave = (item) => {
    const name = "ingredients";

    const index = ingredients.indexOf(item);

    const pendingCopy = pending.map((_item) => ({ ..._item }));
    const localCopy = ingredients.map((item) => ({ ...item }));

    const pendingItem = pendingCopy.filter(
      (_item) => _item.sourceIndex === index
    );

    if (pendingItem.length === 1) {
      if ("value" in pendingItem[0]) {
        const newValue = pendingItem[0]["value"];
        localCopy[index]["name"] = newValue;
      }

      if ("section" in pendingItem[0]) {
        if (pendingItem[0]["section"] === 0) {
          localCopy[index]["section"] = null;
        } else {
          const newSelection = pendingItem[0]["section"];
          localCopy[index]["section"] = newSelection;
        }
      }

      // Remove Editable Flag
      delete localCopy[index].editable;

      // Update the App State
      context.setData(name, localCopy);

      // Remove the item from the pendingArray
      const unchanged = pendingCopy.filter(
        (change) => change.sourceIndex !== index
      );
      setPending(unchanged);

      let payload = {
        name: localCopy[index]["name"],
        section: localCopy[index]["section"],
      };

      if (payload["section"] === null || payload["section"] === 0) {
        payload = {
          name: localCopy[index]["name"],
          section: null,
        };
      }

      doSave(item.id, payload);
    } else {
      toggleEditable(item);
    }
  };

  const doSave = async (id, item) => {
    const endpoint = http.ingredientsEP;
    await toast.promise(http.patch(`${endpoint}${id}/`, item), {
      pending: en.ingredients.patchPromise.pending(item.name),
      success: en.ingredients.patchPromise.success(item.name),
      error: en.ingredients.patchPromise.error(item.name),
    });
  };

  const handleDelete = async (item) => {
    const { name, endpoint, singularTitle } = {
      name: "ingredients",
      endpoint: http.ingredientsEP,
      singularTitle: en.ingredients.titleSingular,
    };

    const deleteMe = window.confirm(en.ingredients.delete.confirm(item.name));

    const currentState = [...ingredients];

    if (deleteMe === true) {
      // We delete from state, then server.
      const unDeleted = ingredients.filter((_item) => _item.id !== item.id);
      context.setData(name, unDeleted);

      try {
        await toast.promise(http.delete(`${endpoint}${item.id}/`), {
          pending: en.ingredients.delete.promise.pending(
            singularTitle,
            item.name
          ),
          success: en.ingredients.delete.promise.success(
            singularTitle,
            item.name
          ),
        });
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.error(en.ingredients.delete.error.alreadyDeleted(item.name));
        } else if (!error.response) {
          toast.error(
            en.ingredients.delete.error.failedTryAgainLater(
              singularTitle,
              item.name
            )
          );
          context.setData(name, currentState);
          toggleEditable(item);
        }
      }
    } else {
      // Do we toggle or not?
      toggleEditable(item);
    }
  };

  const handleCreate = (name, section) => {
    // console.log(name, section);

    let localCopy = ingredients.map((item) => ({ ...item }));

    var newEntry = {};

    if (section === 0) {
      newEntry = { id: 0, name, section: null };
    } else {
      newEntry = { id: 0, name, section };
    }

    localCopy = [...localCopy, newEntry];

    localCopy = sortArray(localCopy);

    // Update the app state
    context.setData("ingredients", localCopy);

    doCreate(newEntry, localCopy);
  };

  const doCreate = async (item, localCopy) => {
    var payload = {};
    if (item["section"] === null) {
      payload = { name: item["name"] };
    } else {
      payload = {
        name: item["name"],
        section: item["section"],
      };
    }

    const endpoint = http.ingredientsEP;
    const result = await toast.promise(http.post(`${endpoint}`, payload), {
      pending: en.ingredients.postPromise.pending(item.name),
      success: en.ingredients.postPromise.success(item.name),
      error: en.ingredients.postPromise.error(item.name),
    });

    const updatedItem = localCopy.filter((_item) => _item === item)[0];
    const index = localCopy.indexOf(updatedItem);

    if (result.status === 201) {
      localCopy[index]["id"] = result.data["id"];
    } else {
      localCopy.splice(index, 1);
    }
    context.setData("ingredients", localCopy);
  };

  const sortArray = (array) => {
    return _.orderBy(array, ["section", "name"], ["asc"]);
  };

  const renderNoSection = () => {
    const noSection = ingredients.filter((item) => item.section === null);

    if (noSection.length === 0) {
      return;
    } else {
      return (
        <Fragment>
          <div className="ingredient-section">
            <Box borderWidth="1px" my={4} p={4}>
              <Heading mb={4} as="h3" size="sm">
                {en.sections.without} <Divider mt={4} />
              </Heading>
              {noSection.map((ingredient) => (
                <EditableInputSelect
                  key={ingredient.id}
                  name={ingredient.name}
                  value={ingredient.name}
                  id={ingredient.id}
                  selectionOptions={sections}
                  itemSelection={ingredient.section}
                  onClick={() => toggleEditable(ingredient)}
                  onChangeInput={(event) =>
                    handleChangeInput(event, ingredient)
                  }
                  onChangeSelect={(event) =>
                    handleChangeSelect(event, ingredient)
                  }
                  onSave={() => handleSave(ingredient)}
                  onCancel={() => handleCancel(ingredient)}
                  onDelete={() => handleDelete(ingredient)}
                  editable={ingredient.editable}
                />
              ))}
            </Box>
          </div>
        </Fragment>
      );
    }
  };

  const renderSectionsIngredients = () => {
    return (
      <Fragment>
        {sections.map((section) => (
          <div key={section.id} className="ingredient-section">
            <Box borderWidth="1px" my={4} p={4}>
              <Heading mb={4} as="h3" size="sm">
                {section.name} <Divider mt={4} />
              </Heading>{" "}
              {ingredients
                .filter((item) => item.section === section.id)
                .map((ingredient) => (
                  <EditableInputSelect
                    key={ingredient.id}
                    name={ingredient.name}
                    value={ingredient.name}
                    id={ingredient.id}
                    selectionOptions={sections}
                    itemSelection={ingredient.section}
                    onClick={() => toggleEditable(ingredient)}
                    onChangeInput={(event) =>
                      handleChangeInput(event, ingredient)
                    }
                    onChangeSelect={(event) =>
                      handleChangeSelect(event, ingredient)
                    }
                    onSave={() => handleSave(ingredient)}
                    onCancel={() => handleCancel(ingredient)}
                    onDelete={() => handleDelete(ingredient)}
                    editable={ingredient.editable}
                  />
                ))}
            </Box>
          </div>
        ))}
      </Fragment>
    );
  };

  return (
    <div>
      <Heading as="h1">{en.ingredients.titlePlural}</Heading>
      <Divider my={4} />

      <CreateIngredientForm
        handleCreate={handleCreate}
        placeHolder={en.ingredients.newName}
        buttonLabel={en.ingredients.createNew}
        selectOptions={sections}
      />
      <Divider my={4} />
      <div className="ingredients">
        {renderNoSection()}
        {renderSectionsIngredients()}
      </div>
    </div>
  );
}

export default Ingredients;
