import React, {useState} from "react";
import AddPostModal from "../../containers/AddPostModal/AddPostModal";
import Header from "../../containers/Header/Header";
import PostItem from "../../containers/Post/Post";
import { ButtonItem } from "../../elements/ButtonItem/ButtonItem";

export const PostsList = () => {
  const [openAddModal, setOpenAddModal] = useState(false)
  return (
    <>
     <div className='taskManager'>
      <Header />
      <div className='taskManager__container'>
        <ButtonItem title="Add Post +" onHandleClick={() => setOpenAddModal(true)} className={""}/>

        <div className='taskManager__tasks'>
          <PostItem
            data={{id: 1, title: "COMPLETE RTK QUERY TUT", description: "TEST"}}
           />
           <PostItem
            data={{id: 1, title: "COMPLETE RTK QUERY TUT", description: "TEST"}}
           />
        </div>
      </div>
      {openAddModal &&
        <AddPostModal onClose={() => setOpenAddModal(false)} open={openAddModal}/>
      }
    </div>
    </>
  );
};
