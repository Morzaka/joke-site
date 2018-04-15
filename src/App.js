import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';



class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      model: {
        quantity: '1',
        nerdy: true,
        explisit: true
      },
      jokes: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmint = this.handleSubmint.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleAllselect = this.handleAllselect.bind(this);
  }

  componentDidMount(){
    this.loadJockes(this.state.model.quantity, '');
  }




  handleChange(event){
    const model = {...this.state.model, quantity: event.target.value};
    this.setState({ model: model });
  }

  handleSubmint(event){
    const queryParams = this.queryURLchecker(this.state.model.nerdy, this.state.model.explisit);
    this.loadJockes(this.state.model.quantity, queryParams);
    event.preventDefault();
  }

  handleCheckbox(event){
    const model = {...this.state.model, [event.target.name]: event.target.checked};
    this.setState({ model: model });
  }

  handleAllselect(){
    const model = {...this.state.model, nerdy: true, explisit: true};
    this.setState({ model: model })
  }



  loadJockes(quantity, params){
    fetch('http://api.icndb.com/jokes/random/' + quantity + params)
      .then(response => response.json())
      .then(data => this.setState({jokes: data.value}));
  }

  jokesRender(jokesArr){
    return jokesArr.map((jokeObject, jokeIndex) => {
      return <li key={jokeIndex} dangerouslySetInnerHTML={{ __html: jokeObject.joke}}></li>;
    });
  }


  queryURLchecker(isNerdy, isExpilsit){
    const defaultURL = '';
    const selectAllURL = '?limitTo=[nerdy,explicit]';
    const NerdyOnlyURL = '?limitTo=[nerdy]';
    const ExplisitOnlyURL = '?limitTo=[explicit]';

    let result = '';
    if (isNerdy && isExpilsit) {
      result = selectAllURL;
    }else if(!isNerdy && isExpilsit){
      result = ExplisitOnlyURL;
    } else if (!isNerdy && !isExpilsit) {
      result = defaultURL;
    } else {
      result = NerdyOnlyURL;
    }


    return result;
  }


  render() {


    return (
      <div className="App" >
        <div className="container">

          <header>
            <h1 className="heading">Random Chuck Norris jokes</h1>
          </header>

          <div className="card text-white bg-secondary mb-3">
            <div className="card-header">Joke Filter</div>
            <div className="card-body">

              <form onSubmit={this.handleSubmint}>

                <div className="form-group">
                  <label htmlFor="exampleFormControlSelect1">How many jokes are shown at a time:</label>
                  <select value={this.state.model.quantity}
                          onChange={this.handleChange}
                          className="form-control"
                          id="exampleFormControlSelect1"
                          name='quantitySelect'>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                    <option value='10'>10</option>
                  </select>
                </div>

                <div>
                  <div className="row">
                    <div className="col d-flex flex-column">

                      <label className="switch">
                        <input type='checkbox' checked={this.state.model.nerdy} name="nerdy" onChange={this.handleCheckbox} />
                        <span className="slider round"></span>
                      </label>
                      <h3>nerdy jokes</h3>

                      <label className="switch">
                        <input type='checkbox' checked={this.state.model.explisit} name="explisit" onChange={this.handleCheckbox} />
                        <span className="slider round"></span>
                      </label>
                      <h3>explisit jokes</h3>

                    </div>
                    {/*<label> Select All :*/}
                    {/*<input type='checkbox' checked={this.state.model.selectAll} name="selectAll" onChange={this.handleCheckbox} />*/}
                    {/*</label>*/}
                    <div className="col">
                      <button type="button"
                              disabled={this.state.model.nerdy && this.state.model.explisit}
                              className="btn btn-info btn-block"
                              onClick={this.handleAllselect}
                              style={{height: "90%", fontSize: '34px'}}>Select All
                      </button>
                    </div>
                  </div>

                </div>

                <div className="clearfix sets">
                  <button type='submit' className="btn btn-warning btn-block btn-lg"><b>U P D A T E</b></button>
                </div>
              </form>


            </div>
          </div>



          <div className="card bg-light mb-3" >
            <div className="card-header">Chuck Norris Header</div>
            <div className="card-body">
              <h5 className="card-title">some jokes</h5>
              <ul className="card-text">
                {this.jokesRender(this.state.jokes)}
              </ul>
            </div>
          </div>

        </div>
      </div>

    );
  }
}

export default App;
