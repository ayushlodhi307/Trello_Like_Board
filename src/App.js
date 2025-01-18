import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

import { BoardContext } from './context/BoardContext';
import Board from './components/Board';



function App() {
  const boardData = {
    active:0,
    boards:[
      {
        name:'My Trello Board',
        bgcolor:'#569',
        list:[
          {id:"1",title:"To do",items:[{id:"cdrFt",title:"Project Description 1"}]},
          {id:"2",title:"In Progress",items:[{id:"cdrFv",title:"Project Description 2"}]},
          {id:"3",title:"Done",items:[{id:"cdrFb",title:"Project Description 3"}]}
        ]
      }
    ]
  };
  const savedData = localStorage.getItem('boardData');
  const [allboard, setAllBoard] = useState(savedData ? JSON.parse(savedData) : boardData);
  // const [allboard,setAllBoard] = useState(boardData); 

  useEffect(() => {
    localStorage.setItem('boardData', JSON.stringify(allboard));
  }, [allboard]);

  
  return (
    <>
    
    <BoardContext.Provider value={{allboard,setAllBoard}}>
    <Header></Header>
      <div className='content flex'>
        <Sidebar></Sidebar>
        <Board></Board>
      </div>
    </BoardContext.Provider>
    </>
  )
}

export default App
