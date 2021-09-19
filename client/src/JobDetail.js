import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {getJobById} from './requests'

export class JobDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {job: 
    {
      company:{
        id:"",
        name:""
      },
      title:"",
      description:""
    }};
  }
  async componentDidMount(){
    const {jobId} = this.props.match.params;
    console.log('job id is ',typeof jobId)
    const data = await getJobById(jobId)
    this.setState({
      job:data
    })
  }
  render() {
    const {job} = this.state;
    return (
      <div>
        <h1 className="title">{job.title}</h1>
        <h2 className="subtitle">
          <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
        </h2>
        <div className="box">{job.description}</div>
      </div>
    );
  }
}
