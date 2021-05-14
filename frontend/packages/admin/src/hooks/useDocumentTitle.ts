import React from "react";

export function useDocumentTitle(title: string | undefined | null) {
  React.useEffect(() => {
    if (title) document.title = title;
  }, [title]);
}
