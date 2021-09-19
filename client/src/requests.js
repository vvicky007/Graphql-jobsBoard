import { isLoggedIn, getAccessToken } from './auth';
import {ApolloClient,HttpLink,InMemoryCache,ApolloLink} from 'apollo-boost'
import gql from 'graphql-tag';
const authlink = new ApolloLink((operation,forward)=>{
 
  if(isLoggedIn()){
    operation.setContext({
      headers:{
        'authorization':'Bearer '+getAccessToken()
      }
    })
  }
  return forward(operation)
})
const client = new ApolloClient({
  link:ApolloLink.from([authlink,new HttpLink({uri:'http://localhost:9000/graphql'})]),
  cache:new InMemoryCache()
})
export async function fetchJobs(){
  const query = gql`{
    jobs{
      id
      title
      company{
        name
      }
    }
  }`
  
  const {data:{jobs}} = await client.query({query,fetchPolicy:'no-cache'})
  
  return jobs
}
const jobQuery =  gql`query getJobById($id:ID!){
  job(id:$id){
    id 
         title
         company{
           name
         }
         description
  }
}`
export async function getJobById(id){
 
  const {data:{job}} = await client.query({query:jobQuery,variables:{id}})
 
  return job
} 

export async function getCompanyById(id){
  const query =  gql` query getCompanyById($id:ID!){
    company(id:$id){
      name
      description
      jobs{
        id
        title
      }
    }
    }`
  const {data:{company}} = await client.query({query,variables:{id}})
  return company
} 

export async function postJob(input){
  const mutation = gql`mutation createjob($input:createJob){
    job: createJobPost(input:$input){
         id 
         title
         company{
           name
         }
         description
       }
       
     }`
  const {data:{job}} = await client.mutate({
    mutation,
    variables:{input},
    update:(cache,{data})=>{
      console.log('[....')
      cache.writeQuery({
        query:jobQuery,
        variables:{id:data.job.id},
        data
      })
  }})
  
  return job
} 