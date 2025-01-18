import React, { useContext } from 'react'
import { BoardContext } from '../context/BoardContext';
import { Grid } from 'react-feather';

const Header = () => {
  const {setAllBoard}=useContext(BoardContext);

  const resetBoard = () => {
    const initialBoardData = {
      active: 0,
      boards: [
        {
          name: "My Trello Board",
          bgcolor: "#069000",
          list: [
            { id: "1", title: "To Do", items: [] },
            { id: "2", title: "In Progress", items: [] },
            { id: "3", title: "Done", items: [] },
          ],
        },
      ],
    };

    // Clear localStorage and reset state
    localStorage.removeItem('boardData');
    setAllBoard(initialBoardData);
  };
  return (
    <div>
        <div className='py-4 px-6 flex justify-between item-center bg-black text-gray-200'>
           <div>  
            <h1 className='text-2xl flex gap-2 items-center text-green-500 '><Grid></Grid>Trello</h1>
           
           </div>
            <button onClick={resetBoard} className='bg-green-500 px-2 py-1 rounded-md'>Reset Board</button>
        </div>
    </div>
  )
}


export default Header