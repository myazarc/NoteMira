const configs = require('./../config');
const knex = require('knex')({
  client: configs.db.dialect,
  connection: {
    host : configs.db.host,
    user : configs.db.user,
    password : configs.db.password,
    database : configs.db.database
  },
  pool: { min: 0, max: 7 },
  //debug: true,
});

module.exports={
  getInstance(){
    return knex;
  },
  login(username,password) {
    return knex('users').where('USERNAME',username).where('PASSWORD',password);
  },

  
  getMains(id=null){
    if(id){
      return knex('maingroups').where('ID',id);
    }
    return knex('maingroups');
  },
  saveMains(data,id=null){
    if(id){
      return knex('maingroups').where('ID',id).update(data);
    }
    return knex('maingroups').insert(data);
  },

  getSeconds(mainId=null){
    if(mainId){
      return knex('secondgroups')
      .select('secondgroups.*')
      .select('maingroups.MAINGROUPNAME')
      .where('MAINGROUPID',mainId)
      .join('maingroups','maingroups.ID','secondgroups.MAINGROUPID');
    }
    return knex('secondgroups').select('secondgroups.*')
      .select('maingroups.MAINGROUPNAME')
      .join('maingroups','maingroups.ID','secondgroups.MAINGROUPID');
  },
  saveSeconds(data,id=null){
    if(id){
      return knex('secondgroups').where('ID',id).update(data);
    }
    return knex('secondgroups').insert(data);
  },


  getDepartment(id=null){
    if(id){
      return knex('departments').where('ID',id);
    }
    return knex('departments');
  },
  saveDepartment(data,id=null){
    if(id){
      return knex('departments').where('ID',id).update(data);
    }
    return knex('departments').insert(data);
  },

  getUser(id=null){
    if(id){
      return knex('users')
      .select('users.*')
      .select('departments.DEPARTMENTNAME')
      .where('users.ID',id)
      .join('departments','departments.ID','users.DEPARTMENTID');
    }
    return knex('users')
    .select('users.*')
    .select('departments.DEPARTMENTNAME')
    .join('departments','departments.ID','users.DEPARTMENTID');
  },
  saveUser(data,id=null){
    if(id){
      return knex('users').where('ID',id).update(data);
    }
    return knex('users').insert(data);
  },


  getNote(id=null,user){
    let query;
    if(id){
      query=knex('notes')
      .select('notes.*')
      .select('maingroups.MAINGROUPNAME')
      .select('secondgroups.SECONDGROUPNAME')
      .select('users.USERNAME')
      .where('notes.ID',id)
      .join('maingroups','maingroups.ID','notes.MAINGROUPID')
      .join('secondgroups','secondgroups.ID','notes.SECONDGROUPID')
      .join('users','users.ID','notes.USERID')

    }else{
      query=knex('notes')
      .select('notes.*')
      .select('maingroups.MAINGROUPNAME')
      .select('secondgroups.SECONDGROUPNAME')
      .select('users.USERNAME')
      .join('maingroups','maingroups.ID','notes.MAINGROUPID')
      .join('secondgroups','secondgroups.ID','notes.SECONDGROUPID')
      .join('users','users.ID','notes.USERID')
    }

    if(!user.SHOWPRIVATENOTES){
      if(user.SHOWPRIVATEDEPARTMENTS){
        query.where(function(){
          this.where('notes.PRIVATENOTE','0').orWhere(function(){
            this.where({
              ['notes.DEPARTMENTID']:user.DEPARTMENTID,
              ['notes.DEPARTMENTPRIVATENOTE']:'1',
            })
          })
        });
      }else{
        query.where({['notes.PRIVATENOTE']:'0',['notes.DEPARTMENTPRIVATENOTE']:'0',});
      }
    }

    return query;
   
  },
  saveNote(data,id=null){
    if(id){
      return knex('notes').where('ID',id).update(data);
    }
    return knex('notes').insert(data);
  },


  deleteTable(table,id,field='ID'){
    return knex(table).where(field,id).delete();
  },

};