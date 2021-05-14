import React from "react";

/**
 * Detech scroll event hook
 * @param domId
 */
export function useScrollEvent(domId) {
  const [fetch, setFetch] = React.useState(false);

  /**
   * Handle scroll, when scrollTop >= scrollHeight - offsetHeight, fetch should be true
   * @param event
   */
  function scrollHandler(event) {
    const canFetch =
      event.target.scrollTop >=
      event.target.scrollHeight - event.target.offsetHeight;

    setFetch(canFetch);
  }

  React.useEffect(() => {
    document.getElementById(domId)?.addEventListener("scroll", scrollHandler);
    return function() {
      document
        .getElementById(domId)
        ?.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  function reset() {
    setFetch(false);
  }

  return { fetch, reset };
}
