import { useParams } from "react-router-dom";

export function useId() {
  //@ts-ignore
  const { id } = useParams();

  return id as string;
}
