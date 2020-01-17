const BASE_URL = 'https://beta.autobooking.com/api/test/v1';
const TERMS = '/search/terms';
const BRAND_TERMS = '/search/brands_terms';
const STYLES = '/search/styles';
const SELECTED_PARAMS ='/search/parse_link';

export const getTermsFromServer = async() => {
  const response = await fetch(BASE_URL + TERMS);

  return response.json();
};
export const getBrandTermsFromServer = async() => {
  const response = await fetch(BASE_URL + BRAND_TERMS);

  return response.json();
};
export const getStylesFromServer = async() => {
  const response = await fetch(BASE_URL + STYLES);

  return response.json();
};

export const getSelectedParamsFromServer = async() => {
  const response = await fetch(BASE_URL + SELECTED_PARAMS);

  return response.json();
};

