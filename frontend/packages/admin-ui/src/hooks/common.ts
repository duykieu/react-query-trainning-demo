import { useLocation, useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

export const useCommons = () => {
    const location = useLocation();

    const params = useParams();

    const history = useHistory();

    const dispatch = useDispatch();

    return { location, params, history, dispatch };
};
