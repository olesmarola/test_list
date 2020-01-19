import React, {memo} from "react";
import {useHistory, useLocation} from "react-router-dom";

const List = ({list, prefix, defaultValue = -1}) => {
  const history = useHistory();
  const location = useLocation();

  const selectOption = (list, id, prefix) => {
    const currentUrl = location.pathname;
    let params = currentUrl.slice(1).split('/');

    if (+id === -1) {
      params = params.filter(param => !param.startsWith(prefix));
    } else {
      const item = list.find(item => item.id === +id);

      if (item.hasOwnProperty('slug')) {
        if(params.every(param => param === '')) {
          params = [];
        }

        if (params.some(param => param.startsWith(prefix))) {
          params = params.map(param => {
            if(param.startsWith(prefix)) {
              return prefix + item.slug;
            }

            return param;
          });
        } else {
          params.push(prefix + item.slug);
        }
      }
    }

    history.push({
      pathname: `/${params.join('/')}`,
    });
  };

  return (
    <select
      onChange={(e) => selectOption(list, e.target.value, prefix)}
      defaultValue={defaultValue}
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

export default memo(List);
