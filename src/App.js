import React, { Component } from 'react'
import logo from './icons8_university.svg';
import './App.css';

export class App extends Component {
  constructor(){
    super();
    this.getData=this.getData.bind(this);
    this.onChangeFilter=this.onChangeFilter.bind(this);
  }
  state = {
    filter:'',
    datas: []
  }
  getData() {
    fetch("http://universities.hipolabs.com/search?country=Turkey")
      .then((res) => res.json())
      .then((da) => {this.setState({datas:da});});
  }
  onChangeFilter(e){
    this.setState({
      filter: e.target.value
    });
  }
  render() {
    this.getData();
    const filteredDatas = this.state.datas.filter(
      data =>{
        return data.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) !==-1;
      }
    );
    return (
      <>
        <div className="App" >
          <header id="header">
            <img src={logo} className="logo" alt="Logo" />
            <h1>Turkey's universities</h1>
            <div className="search-bar">
              <input type="text" onChange={this.onChangeFilter} placeholder="Filter by name" />
            </div>
          </header>
          <section id="university-cards">
            {filteredDatas.map(data =>{
              return(
                <div class="university-container">
                <div class="university">
                    <div class="university-preview">
                        <h6>NAME</h6>
                        <h2><a href={data.web_pages[0]}>{data.name}</a></h2>
                    </div>
                    <div class="university-info">
                        <h6>LOCATION</h6>
                        <h2>{data.country}</h2>
                        <h6>DOMAIN</h6>
                        <h2>{data.domains[0]}</h2>
                    </div>
                </div>
            </div>
              );
            })}
          </section>
        </div>
      </>
    )
  }
}

export default App;
