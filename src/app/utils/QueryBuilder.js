// Utils
import { db, geofirestore } from "utils/firebase";

// Custom Exceptions
import InvalidParameterException from "utils/exceptions/InvalidParameterException";


/*** Base Class ***/

class FirestoreQuery {

  constructor(query) {
    // Construct base class with a created query
    this.query = query;
  }

  AddFilter = (fieldName, comparisonOperator, value) => {

    // Validate filter field name is valid
    if (!fieldName || typeof fieldName !== "string") {
      throw new InvalidParameterException("Invalid firestorm collection field name.");
    }

    // Validate filter comparison operator is valid
    if (!["<", "<=", "==", ">=", ">", "array-contains", "in", "array-contains-any"].includes(comparisonOperator)) {
      throw new InvalidParameterException("Invalid firestorm comparison operator.");
    }

    // Validate filter value is value
    if (value === undefined) {
      throw new InvalidParameterException("Invalid firestorm filter value.");
    }

    // Add query result filter rule
    this.query = this.query.where(fieldName, comparisonOperator, value);
  }

  AddPageSize = (pageSize = 20) => {

    // Validate page size
    if (typeof pageSize !== "number" || pageSize <= 0) {
      throw new InvalidParameterException("Invalid page size value.");
    }

    // Add result size limit to query
    this.query = this.query.limit(pageSize);
  }

  AddSortOrder = (fieldName, isDescending = false) => {

    // Validate filter field name is valid
    if (!fieldName || typeof fieldName !== "string") {
      throw new InvalidParameterException("Invalid firestorm collection field name.");
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

}


/*** Derived classes ***/

export class PaginatedFirestoreQuery extends FirestoreQuery {

  constructor(collectionName) {

    if (typeof collectionName !== "string") {
      throw new InvalidParameterException("Invalid firestore collection name.");
    }

    super(db.collection(collectionName));
  }

  AddPaginationStartAtCursor = (cursor) => {

    // Validate cursor value (cursor can be number or document)
    if (!cursor && cursor !== 0) {
      throw new InvalidParameterException("Invalid pagination cursor value.");
    }

    // Set pagination to start at cursor
    this.query = this.query.startAt(cursor);
  }

  AddPaginationStartAfterCursor = (cursor) => {

    // Validate cursor value (cursor can be number or document)
    if (!cursor && cursor !== 0) {
      throw new InvalidParameterException("Invalid pagination cursor value.");
    }

    // Set pagination to start after cursor
    this.query = this.query.startAfter(cursor);
  }

  AddPaginationEndAtCursor = (cursor) => {

    // Validate cursor value (cursor can be number or document)
    if (!cursor && cursor !== 0) {
      throw new InvalidParameterException("Invalid pagination cursor value.");
    }

    // Set pagination to end at cursor
    this.query = this.query.endAt(cursor);
  }

  AddPaginationEndBeforeCursor = (cursor) => {

    // Validate cursor value (cursor can be number or document)
    if (!cursor && cursor !== 0) {
      throw new InvalidParameterException("Invalid pagination cursor value.");
    }

    // Set pagination to end before cursor
    this.query = this.query.endBefore(cursor);
  }

  GetQueryDocuments = async () => {
    // Execute query
    const results = await this.query.get();

    // Return query documents
    return results.docs.map(doc => doc.data());
  }

}

export class GeoFirestoreQuery extends FirestoreQuery {

  constructor(collectionName) {

    if (typeof collectionName !== "string") {
      throw new InvalidParameterException("Invalid firestore collection name.");
    }

    super(geofirestore.collection(collectionName));
  }

  AddDistanceFilter = (center, radius, limit = Infinity) => {
    this.query = this.query.near({ center, radius, limit });
  }

  GetQueryDocuments = async () => {
    // Execute query
    const results = await this.query.get();

    // Return query documents sorted by distance
    return results.docs.sort((a, b) => a.distance - b.distance).map(doc => doc.data());
  }

}