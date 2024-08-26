export const apiUrls = {
  productprices: `${process.env.REACT_APP_CREDIT_AGRICOLE_API_URL}/ws/productprices`,
  productlist: `${process.env.REACT_APP_CREDIT_AGRICOLE_API_URL}/api/productlist`,
};

export const dateFormat : Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
};

export const dateLocale = 'en-GB'