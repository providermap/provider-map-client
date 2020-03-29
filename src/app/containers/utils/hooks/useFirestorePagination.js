import { useReducer, useEffect } from "react";

const initialState = {
    hasMore: false,
    after: null,
    limit: 0,
    items: [],
    lastLoaded: null,
    loading: true,
    loadingError: null,
    loadingMore: false,
    loadingMoreError: null
};

const reducer = (state, action) => {
  switch (action.type) {

    case "LOADED": {
      let items = [...state.items];
      let isAdding = false;

      action.value.docChanges().forEach(change => {
        if (change.type === "added") {
          isAdding = true;
          addItem(change.doc, items);
        }
        else if (change.type === "modified") {
          updateItem(change.doc, items);
        }
        else if (change.type === "removed") {
          deleteItem(change.doc, items);
        }
      });

      const nextLimit = items.length + action.limit;
      let end = items.length < action.limit || nextLimit === state.limit;

      return {
        ...state,
        hasMore: isAdding ? !end : state.hasMore,
        limit: nextLimit,
        loading: false,
        loadingError: null,
        lastLoaded: action.value.docs[action.value.docs.length - 1],
        loadingMore: false,
        items
      };
    }

    case "LOAD-MORE": {
      return {
        ...state,
        loadingMore: true,
        after: state.lastLoaded
      };
    }

  }
}

const findIndexOfDocument = (doc, items) => items.findIndex((item) => item.id === doc.id);

const updateItem = (doc, items) => {
  const i = findIndexOfDocument(doc, items);
  items[i] = doc;
}

const deleteItem = (doc, items) => {
  const i = findIndexOfDocument(doc, items);
  items.splice(i, 1);
}

const addItem = (doc, items) => {
  const i = findIndexOfDocument(doc, items);
  if (i === -1) {
    items.push(doc);
  }
}

const useFirestorePagination = (query, limit = 25) => {
  console.log("useFirestorePagination -> query", query)

  const [ state, dispatch ] = useReducer(reducer, initialState);

  // When "after" changes, we update our query
  useEffect(() => {
    let fn = query.limit(state.limit || limit);

    let listener = fn.onSnapshot((snap) => void dispatch({ type: "LOADED", value: snap, limit }));

    // Call unsubscribe function that can be called to cancel the snapshot listener
    return () => listener();

  }, [state.after]);

  // Trigger firebase to load more data
  const loadMore = () => dispatch({ type: "LOAD-MORE" });

  // Trigger firebase to loader new filtered data
  // const filter = () => dispatch({ type: "FILTER" });

  return {
    loadingMore: state.loadingMore,
    loadingError: state.loadingError,
    loadingMoreError: state.loadingMoreError,
    loading: state.loading,
    hasMore: state.hasMore,
    items: state.items,
    loadMore,
  };
}

export default useFirestorePagination;