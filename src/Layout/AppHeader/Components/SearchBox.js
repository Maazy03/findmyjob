import React, { Fragment, useEffect, useState } from "react";
import ReactSearchBox from "react-search-box";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../../store/actions";

const SearchBox = props => {
  const reduxArtsState = useSelector(state => state.product)
  const dispatch = useDispatch();
  const [list, setSearchList] = useState([]);
  useEffect(() => {
    setSearchList(reduxArtsState.artSearchList)
  });

  async function getListItem(e) {
    try {
      const result = await dispatch(
        productActions.getAllProductsListForSearch(e)
      );
      setSearchList(result);
    } catch (error) {
      console.log("view error", error)
    }
  }

  async function search(e) {
    if (e.length > 2) {
      await getListItem(e)
    }
  }

  return (
    <div>
      <div
        style={{
          position: "absolute",
          width: "55%",
          marginTop: "-20px",
          zIndex: 4,
          color: "#5f6769"
        }}
      >
        <ReactSearchBox
          placeholder="search..."
          onChange={e => search(e)}
          data={list}
          dropDownHoverColor="lightblue"
        // onSelect={e => onSelectProduct(e)}
        />
      </div>
    </div>
  );
}

export default SearchBox