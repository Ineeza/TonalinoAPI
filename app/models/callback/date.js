export default {
  updatedDate: (self, next)=>{
    return (_=>{
      self.updated_DATE = new Date();
      return next();
    })();
  }
}
