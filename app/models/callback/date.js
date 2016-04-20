export default {
  createdDate: next=>{
    this.created_DATE = new Date();
    this.updated_DATE = new Date();
    return next();
  },
  updatedDate: next=>{
    this.updated_DATE = new Date();
    return next();
  }
}
