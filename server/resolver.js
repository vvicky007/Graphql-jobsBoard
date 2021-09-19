const db = require('./db')
const Query = {
  job:(root,{id})=>db.jobs.get(id),
  jobs:()=> db.jobs.list(),
  company:(root,{id})=>db.companies.get(id)
}
const Mutation = {
  createJobPost:(root,{input},user)=>{
    
    if(!user){
      throw new Error('Un Authorized Access')
    }
    
    const id = db.jobs.create({...input,companyId:user.companyId})
    return db.jobs.get(id)
  }
}
const Job = {
  // we are writing company resolver Job cause it has to be resolved for Job type
  company:(job)=>db.companies.get(job.companyId)
}
const Company = {
  jobs:(company)=>db.jobs.list().filter((j)=>j.companyId === company.id)
}
module.exports = {
  Query,Job,Company,Mutation
}