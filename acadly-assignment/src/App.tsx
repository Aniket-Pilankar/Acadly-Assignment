import React from 'react';
import logo from './logo.svg';
import './App.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import InfiniteScrollList from './Components/InfiniteScrollList';
import { Center, CenterV } from "./Components/Styles";


const App:React.FC = () => {

  

  return (
    <div className="App">
      <Center  >
      <InfiniteScrollList/>
      </Center>
    </div>
  );
}

export default App;
