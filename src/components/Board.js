import React, { useContext } from 'react'
import Addcard from './Addcard'
import AddList from './AddList'
import { MoreHorizontal,Edit2,Trash2 } from 'react-feather'
import { BoardContext } from '../context/BoardContext'
import { DragDropContext,Draggable,Droppable } from 'react-beautiful-dnd'
import util from '../utils/util'

const Board = () => {
  const {allboard,setAllBoard} = useContext(BoardContext);
  const bData = allboard.boards[allboard.active];

  const deleteList = (listIndex) => {
    const updatedList = [...bData.list];
    updatedList.splice(listIndex, 1);

    const updatedBoard = { ...allboard };
    updatedBoard.boards[updatedBoard.active].list = updatedList;
    setAllBoard(updatedBoard);
  };

  const deleteCard = (listIndex, cardIndex) => {
    const updatedList = [...bData.list];
    updatedList[listIndex].items.splice(cardIndex, 1);

    const updatedBoard = { ...allboard };
    updatedBoard.boards[updatedBoard.active].list = updatedList;
    setAllBoard(updatedBoard);
  };
  

  function onDragEnd(res){
      if(!res.destination){
          console.log("No Destination");
          return;
      }
      const newList = [...bData.list];
      const s_id = parseInt(res.source.droppableId);
      const d_id = parseInt(res.destination.droppableId);
      const [removed] = newList[s_id - 1].items.splice(res.source.index,1);
      newList[d_id - 1].items.splice(res.destination.index,0,removed);

      let board_ = {...allboard};
      board_.boards[board_.active].list = newList;
      setAllBoard(board_);
  }

  const cardData = (e,ind)=>{
    let newList = [...bData.list];
    newList[ind].items.push({id:util.makeid(5),title:e});

    let board_ = {...allboard};
    board_.boards[board_.active].list = newList;
    setAllBoard(board_);
}
const listData = (e)=>{
  let newList = [...bData.list];
  newList.push(
      {id:newList.length + 1 + '',title:e,items:[]}
  );

  let board_ = {...allboard};
  board_.boards[board_.active].list = newList;
  setAllBoard(board_);
}
  return (
   
    <div className='flex flex-col w-full' style={{backgroundColor:`${bData.bgcolor}`}}>
    <div className='p-3 bg-black flex justify-between w-full bg-opacity-50'>
        <h2 className='text-lg'>{bData.name}</h2>
       
    </div>
    <div className='flex flex-col w-full flex-grow relative'>
        <div className='absolute mb-1 pb-2 left-0 right-0 top-0 bottom-0 p-3 flex overflow-x-scroll overflow-y-hidden'>
        <DragDropContext onDragEnd={onDragEnd}>
        {bData.list && bData.list.map((x,ind)=>{
           return <div key={ind} className='mr-3 w-60 h-fit rounded-md p-2 bg-black flex-shrink-0'>
            <div className="list-body">
                <div className='flex justify-between p-1'>
                    <span>{x.title}</span>
                    <div className='flex gap-2'>
                      <button
                          className="hover:bg-gray-500 p-1 rounded-sm"
                          onClick={() => deleteList(ind)}
                        >
                          <Trash2 size={16} />
                        </button>
                    <button className='hover:bg-gray-500 p-1 rounded-sm'><MoreHorizontal size={16}></MoreHorizontal></button></div>
                </div>
                <Droppable droppableId={x.id}>
                {(provided, snapshot) => (
                    <div className='py-1'
                    ref={provided.innerRef}
                    style={{ backgroundColor: snapshot.isDraggingOver ? '#222' : 'transparent' }}
                    {...provided.droppableProps}
                    >
                    {x.items && x.items.map((item,index)=>{
                    return <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="item flex justify-between items-center bg-zinc-700 p-1 cursor-pointer rounded-md border-2 border-zinc-900 hover:border-gray-500">
                            <span>{item.title}</span>
                            <span className='flex justify-start items-start'>
                                <button className='hover:bg-gray-600 p-1 rounded-sm'><Edit2 size={16}></Edit2></button>
                                <button
                          className="hover:bg-gray-500 p-1 rounded-sm"
                          onClick={() => deleteCard(ind,index)}
                        >
                          <Trash2 size={16} />
                        </button>
                            </span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                    
                })}

                    {provided.placeholder}
                    </div>
                )}
                </Droppable>
                
                

                <Addcard getcard={(e)=>cardData(e,ind)}></Addcard>
            </div>
        </div>
        })
        }
        </DragDropContext>

        <AddList getlist={(e)=>listData(e)}></AddList>
        
        
        </div>
    </div>
</div>

  )
}

export default Board