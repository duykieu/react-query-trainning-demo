import React from "react";
import { useLocation } from "react-router-dom";
import qs from "querystring";

export function useQueryString() {
  const location = useLocation();

  const [query, setQuery] = React.useState<any>({});

  const [stringified, setStringified] = React.useState("");

  React.useEffect(() => {
    const [, search] = location.search.split("?");
    const queryString = qs.parse(search);
    setQuery(queryString);
  }, [location.search]);

  React.useEffect(
    function() {
      setStringified(qs.stringify(query));
    },
    [query]
  );

  return {
    query,
    stringified,
    getQuery(additional = {}) {
      return {
        ...query,
      };
    },
    getStringified(additional = {}) {
      const nextQuery = {
        ...query,
        ...additional,
      };
      return qs.stringify(nextQuery);
    },
  };
}
