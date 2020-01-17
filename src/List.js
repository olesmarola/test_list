import React from "react";
import {useHistory, useParams} from "react-router-dom";
import {BRAND_TERM_PREFIX, STYLE_PREFIX, TERM_PREFIX} from "./constants";

const List = ({list, param, prefix}) => {
  const history = useHistory();
  const params = useParams();

  const selectOption = (list, id, prefix) => {
    const item = list.find(item => item.id === +id);

    switch (prefix) {
      case TERM_PREFIX:
        history.push({
          pathname: `/${item ? item.slug : 'empty'}/${params.brandTerm || 'empty'}/${params.style || 'empty'}`,
        });
        break;

      case BRAND_TERM_PREFIX:
        history.push({
          pathname: `/${params.term || 'empty'}/${item ? item.slug : 'empty'}/${params.style || 'empty'}`,
        });
        break;

      case STYLE_PREFIX:
        history.push({
          pathname: `/${params.term || 'empty'}/${params.brandTerm || 'empty'}/${item ? item.slug : 'empty'}`,
        });
        break;

      default:
        history.push({
          pathname: `/${params.term || 'empty'}/${params.brandTerm || 'empty'}/${params.style || 'empty'}`,
        });
    }
  };

  const setDefaultValue = (list, urlParam, prefix) => {
    if (!urlParam) {
      return -1;
    }

    const value = list.find(item => item.slug === urlParam.replace(new RegExp(prefix), ''));

    if (value) {
      return value.id;
    }

    return -1;
  };

  return (
    <select
      onChange={(e) => selectOption(list, e.target.value, prefix)}
      defaultValue={setDefaultValue(list, param, prefix)}
    >
      <option value="-1">{''}</option>
      {list.map((item) => <option
        value={item.id}
        key={item.id}
      >
        {item.label}
      </option>)}
    </select>
  );
};

export default List;
