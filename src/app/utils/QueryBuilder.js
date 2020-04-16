import { db, geofirestore } from "utils/firebase";


class FirestoreQuery {

  constructor(collectionName) {
    // Construct new query with collection name
    this.query = db.collection(collectionName);
  }

  AddFilter(fieldName, comparisonOperator, value) {

    // Validate filter field name is valid
    if (!fieldName || typeof fieldName !== "string") {
      console.error("Invalid firestorm collection field name.");
      return
    }

    // Validate filter comparison operator is valid
    if (!["<", "<=", "==", ">=", ">", "array-contains", "in", "array-contains-any"].contains(comparisonOperator)) {
      console.error("Invalid firestorm comparison operator.");
      return;
    }

    // Validate filter value is value
    if (value === undefined) {
      console.error("Invalid firestorm filter value.");
      return;
    }

    // Add query result filter rule
    this.query = this.query.where(fieldName, comparisonOperator, value);
  }

  AddPageSize(pageSize = 20) {

    // Validate page size
    if (typeof pageSize !== "number") {
      console.error("Invalid page size value.");
      return;
    }

    // Add result size limit to query
    this.query = this.query.limit(pageSize);
  }

  AddSortOrder(fieldName, isDescending = false) {

    // Validate filter field name is valid
    if (!fieldName || typeof fieldName !== "string") {
      console.error("Invalid firestorm collection field name.");
      return
    }

    // Set query result order rule
    if (!isDescending) {
      // Order by field ascending
      this.query = this.query.orderBy(fieldName);
    }
    else {
      // Order by field descending
      this.query = this.query.orderBy(fieldName, "desc");
    }
  }

  AddPaginationStartAtCursor(cursor) {

    // Validate cursor value (cursor can be number or document)
    if (!cursor && cursor !== 0) {
      console.error("Invalid pagination cursor value.");
      return;
    }

    // Set pagination to start at cursor
    this.query = this.query.startAt(cursor);
  }

  AddPaginationStartAfterCursor(cursor) {

    // Validate cursor value (cursor can be number or document)
    if (!cursor && cursor !== 0) {
      console.error("Invalid pagination cursor value.");
      return;
    }

    // Set pagination to start after cursor
    this.query = this.query.startAfter(cursor);
  }

  AddPaginationEndAtCursor(cursor) {

    // Validate cursor value (cursor can be number or document)
    if (!cursor && cursor !== 0) {
      console.error("Invalid pagination cursor value.");
      return;
    }

    // Set pagination to end at cursor
    this.query = this.query.endAt(cursor);
  }

  AddPaginationEndBeforeCursor(cursor) {

    // Validate cursor value (cursor can be number or document)
    if (!cursor && cursor !== 0) {
      console.error("Invalid pagination cursor value.");
      return;
    }

    // Set pagination to end before cursor
    this.query = this.query.endBefore(cursor);
  }

  async GetQueryDocuments() {
    // Execute query
    const results = await this.query.get();

    // Return query documents
    return results.docs.map(doc => doc.data());
  }
}

class GeoFirestoreQuery {

  constructor(collectionName) {
    this.query = geofirestore.collection(collectionName);
  }

  AddFilter(fieldName, comparisonOperator, value) {

    // Validate filter field name is valid
    if (!fieldName || typeof fieldName !== "string") {
      console.error("Invalid firestorm collection field name.");
      return
    }

    // Validate filter comparison operator is valid
    if (!["<", "<=", "==", ">=", ">", "array-contains", "in", "array-contains-any"].contains(comparisonOperator)) {
      console.error("Invalid firestorm comparison operator.");
      return;
    }

    // Validate filter value is value
    if (value === undefined) {
      console.error("Invalid firestorm filter value.");
      return;
    }

    // Add query result filter rule
    this.query = this.query.where(fieldName, comparisonOperator, value);
  }

  AddPageSize(pageSize = Infinity) {

    // Validate page size
    if (typeof pageSize !== "number") {
      console.error("Invalid page size value.");
      return;
    }

    // Add result size limit to query
    this.query = this.query.limit(pageSize);
  }

  AddSortOrder(fieldName, isDescending = false) {

    // Validate filter field name is valid
    if (!fieldName || typeof fieldName !== "string") {
      console.error("Invalid firestorm collection field name.");
      return
    }

    // Set query result order rule
    if (!isDescending) {
      // Order by field ascending
      this.query = this.query.orderBy(fieldName);
    }
    else {
      // Order by field descending
      this.query = this.query.orderBy(fieldName, "desc");
    }
  }

  async GetQueryDocuments() {
    // Execute query
    const results = await this.query.get();

    // Return query documents sorted by distance
    return results.docs.sort((a, b) => a.distance - b.distance).map(doc => doc.data());
  }
}

export { FirestoreQuery, GeoFirestoreQuery };