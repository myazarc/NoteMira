const Output=function(){
  this.status='error';
  this.data=null;
  this.errMsg=null;

  this.setError= function(errMsg){
    const err = errMsg || null;
    this.errMsg=err;
  }

  this.setData=function(data){
    this.status='success';
    this.data=data;
  };

  this.setStatus=function(status){
    this.status=status;
  };

  this.getResponse=function(){
    return {
      status:this.status,
      data:this.data,
      errMsg:this.errMsg
    };
  };
};

module.exports = Output;