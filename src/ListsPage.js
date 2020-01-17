import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {getTermsFromServer, getBrandTermsFromServer, getStylesFromServer, getSelectedParamsFromServer} from "./api";

import List from "./List";
import {BRAND_TERM_PREFIX, STYLE_PREFIX, TERM_PREFIX} from "./constants";

const ListsPage = () => {
  const [terms, setTerms] = useState([]);
  const [brandsTerms, setBrandsTerms] = useState([]);
  const [styles, setStyles] = useState([]);
  const [selectedParams, setSelectedParams] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();


  const loadListValues = async () => {
    const [
      termsFromServer,
      brandsTermsFromServer,
      stylesFromServer,
      selectedParamsFromServer,
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
    setSelectedParams(selectedParamsFromServer);
    setIsLoading(false);
  };
  console.log(params)
  useEffect(() => {
    loadListValues();
  }, []);

  return isLoading
    ? (
      <span>Loading...</span>
    )
    : (
      <>
        <List list={terms} param={selectedParams.service.slug || params.term} prefix={TERM_PREFIX}/>
        <List list={brandsTerms} param={selectedParams.brand.slug || params.brandTerm} prefix={BRAND_TERM_PREFIX}/>
        <List list={styles} param={selectedParams.style.slug || params.style} prefix={STYLE_PREFIX}/>
      </>
    );
};

export default ListsPage;
