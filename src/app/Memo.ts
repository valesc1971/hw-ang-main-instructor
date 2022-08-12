export interface Memo{
    id?: number,  // ? = optional
    userID?: number,
    createdOn: Date,  // with upcase because it is not primitve
    text: string
}