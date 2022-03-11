import { useState, useCallback } from "react";

export default (initialstate = null) => {

  const [value, setValue] = useState(initialstate);

  const handler = useCallback((event) => {
    setValue(event.target.value);
  }, [])

  return [value, handler, setValue];
}