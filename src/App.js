import React, { Component } from 'react';
import RecipeModal from './modal'
import './App.css';
import RecipeList from './recipeList'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      recipes:[],
      modal: false,
      edit:false,
      title:'',
      ing: '',
      index:''
    };
    this.toggle = this.toggle.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.addRecipe=this.addRecipe.bind(this);
    this.editAdded=this.editAdded.bind(this);
  }
  componentWillMount(){
    var recipeBox= (typeof localStorage["recipe"] !== "undefined")? JSON.parse(localStorage["recipe"]):[{ title: 'curry', recIng: ['aloo','jeera']}];
    this.setState({recipes: this.state.recipes.concat(recipeBox)})
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      edit: false
    });
  }

  handleChange(e){
    const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
  }

  addRecipe(){
    this.state.recipes.push({title:this.state.title, recIng: this.state.ing.split(',')})
    this.setState({recipes:this.state.recipes,
                    modal:!this.state.modal
                  });
    let newRecipes=this.state.recipes
    localStorage.setItem('recipe',JSON.stringify(newRecipes))
  }
  
  editAdded(){
    let i = this.state.index;
    this.state.recipes.splice(i,1,{title:this.state.title, recIng: this.state.ing.split(',')});
    this.setState({
      recipes:this.state.recipes,
      edit: !this.state.edit,
      modal: !this.state.modal
    });
    let newRecipes=this.state.recipes
    localStorage.setItem('recipe',JSON.stringify(newRecipes))
  }

  edit(i){
    this.setState({
      edit:!this.state.edit,
      modal: !this.props.modal,
      title:this.state.recipes[i].title,
      ing:this.state.recipes[i].recIng.join(','),
      index:i

    })
  }
  delete(i){
    let deleted= this.state.recipes.splice(i,1);
    this.setState({
      recipes: this.state.recipes
    })
     localStorage.setItem('recipe',JSON.stringify(this.state.recipes))

  }
  
  render() {
    return (
      <div>
        <header>
          <h1 className="title">Recipe Box</h1>
        </header>
        <div id="recipelist">
        { this.state.recipes.map((item,i)=>{
              return (
                <RecipeList key={i} name={item.title} ing={item.recIng} edit={this.edit.bind(this,i)} deleteRecipe={this.delete.bind(this,i)}/>
              )})
        }
        </div>
          <RecipeModal edit={this.state.edit} add={this.addRecipe} toggle={this.toggle} change={this.handleChange} modal={this.state.modal} currentTitle={this.state.title} editAdd={this.editAdded} ing={this.state.ing}/>
        </div>
        
    );
  }
}

export default App;
