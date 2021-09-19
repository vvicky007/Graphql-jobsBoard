import React, { Component } from 'react';
import {getCompanyById} from './requests'
import { JobList } from './JobList';
export class CompanyDetail extends Component {
  constructor(props) {
    super(props);
    
    this.state = {company: {
      name:"",
      description:"",
      jobs:[]
    }};
  }
  async componentDidMount(){
    const {companyId} = this.props.match.params;
    const data = await getCompanyById(companyId)
    this.setState({company:data})
  }

  render() {
    const {company} = this.state;
    return (
      <div>
        <h1 className="title">{company.name}</h1>
        <div className="box">{company.description}</div>
        <h5 className="title is-5" >Jobs at {company.name}</h5>
        <JobList jobs = {company.jobs} />
      </div>
    );
  }
}
