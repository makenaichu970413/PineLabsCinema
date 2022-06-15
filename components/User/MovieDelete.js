import React from "react";

// ####################################
// API
// ####################################
import { deleteMovie } from "../../utils/api";
// ####################################

// ####################################
// REDUX
// ####################################
import { useStateValue } from "../../redux/StateProvider";
// ####################################

function MovieDelete(props) {
  const { data, setLoading } = props;
  const [{}, dispatch] = useStateValue();

  const handleDeleteClick = async () => {
    let req = { docID: data["docID"], movieID: data["id"] };
    // console.log("req: ", req);

    dispatch({ type: "SET_MESSAGE", message: { status: 0, message: null } });
    const res = await deleteMovie(req);
    if (res["status"] === 201) {
      setLoading(true);
    }
    dispatch({ type: "SET_MESSAGE", message: res });
  };

  return (
    <div className="delete-movie" onClick={handleDeleteClick}>
      <i className="bx bx-trash"></i>
    </div>
  );
}

export default MovieDelete;
