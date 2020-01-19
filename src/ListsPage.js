import React, {useState, useEffect, memo} from "react";
import {useLocation} from "react-router-dom";
import {getTermsFromServer, getBrandTermsFromServer, getStylesFromServer, getSelectedParamsFromServer} from "./api";

import List from "./List";
import {BRAND_TERM_PREFIX, STYLE_PREFIX, TERM_PREFIX} from "./constants";

const ListsPage = () => {
  const [defaultValues, setDefaultValues] = useState(null);
  const [terms, setTerms] = useState([]);
  const [brandsTerms, setBrandsTerms] = useState([]);
  const [styles, setStyles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();


  const loadListValues = async () => {
    const [
      termsFromServer,
      brandsTermsFromServer,
      stylesFromServer,
    ] = await Promise.all(
      [
        getTermsFromServer(),
        getBrandTermsFromServer(),
        getStylesFromServer(),
        getSelectedParamsFromServer(),
      ]
    );

    setTerms(termsFromServer.data);
    setBrandsTerms(brandsTermsFromServer.data);
    setStyles(stylesFromServer.data);
    setIsLoading(false);
  };

  const getDefaultValues = async () => {
    const currentUrl = location.pathname;
    const message = {};

    currentUrl.slice(1).split('/').forEach(item => {
      if (item.slice(0, TERM_PREFIX.length) === TERM_PREFIX) {
        message.service_slug = item.slice(TERM_PREFIX.length);
      }

      if (item.slice(0, BRAND_TERM_PREFIX.length) === BRAND_TERM_PREFIX) {
        message.brand_slug = item.slice(BRAND_TERM_PREFIX.length);
      }

      if (item.slice(0, STYLE_PREFIX.length) === STYLE_PREFIX) {
        message.style_slug = item.slice(STYLE_PREFIX.length);
      }
    });

    setDefaultValues(await getSelectedParamsFromServer(message));
  };

  useEffect(() => {
    loadListValues();
    getDefaultValues();
  }, []);

  return isLoading
    ? (
      <span>Loading...</span>
    )
    : (
      <>
        <List list={terms} prefix={TERM_PREFIX}
              defaultValue={defaultValues.service.hasOwnProperty('id') ? defaultValues.service.id : null}/>
        <List list={brandsTerms} prefix={BRAND_TERM_PREFIX}
              defaultValue={defaultValues.brand.hasOwnProperty('id') ? defaultValues.brand.id : null}/>
        <List list={styles} prefix={STYLE_PREFIX}
              defaultValue={defaultValues.style.hasOwnProperty('id') ? defaultValues.style.id : null}/>
      </>
    );
};

export default memo(ListsPage);
