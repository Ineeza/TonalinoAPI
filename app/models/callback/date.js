export default {
  createdDate: (self, next)=>{
    return (_=>{
      self.created_DATE = new Date();
      self.updated_DATE = new Date();
      return next();
    })();
  },
  updatedDate: (self, next)=>{
    return (_=>{
      self.updated_DATE = new Date();
      return next();
    })();
  }
}
