import React, { Component } from 'react';

import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';
import ProductData from './utilities/data.json'
import {FaArrowCircleUp} from 'react-icons/fa';
import NykaaLogo from './assets/nykaa_logo.svg'

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      productList: [],
      searchField: '',
      showScroll: false,
      width: 0,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }


  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }
  

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ productList: ProductData }));
    window.addEventListener('scroll', this.checkScrollTop)
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  checkScrollTop = () => {
    if (!this.state.showScroll && window.pageYOffset > 400){
      console.log('If')
      this.setState({ showScroll: true });
    } else if (this.state.showScroll && window.pageYOffset <= 400){
      console.log('If else')
      this.setState({ showScroll: false });
    }
  };


  onSearchChange = event => {
    this.setState({ searchField: event.target.value });
  };

  scrollTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  render() {
    const { productList, searchField } = this.state;
    const filtereProducts = productList.filter(product =>
      product.title.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className='App'>
        <div>
         <img src={NykaaLogo} alt="Nykaa Logo" className="nykaaLogo" />  
        </div>
        <FaArrowCircleUp 
          className="scrollTop" 
          onClick={this.scrollTop} 
          style={{height: 40,  display: this.state.showScroll ? 'flex' : 'none', left: this.state.width - 230 }} />
        <SearchBox onSearchChange={this.onSearchChange} />
        <CardList products={filtereProducts} />
      </div>
    );
  }
}

export default App;
