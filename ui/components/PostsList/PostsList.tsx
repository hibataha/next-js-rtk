import React, {useState} from "react";
import { IPostItemModel } from "../../../models/interfaces";
import { usePostsQuery } from "../../../services/postApi";
import AddPostModal from "../../containers/AddPostModal/AddPostModal";
import Header from "../../containers/Header/Header";
import PostItem from "../../containers/Post/Post";
import { ButtonItem } from "../../elements/ButtonItem/ButtonItem";

export const PostsList = () => {
  const { data, error, isLoading, isSuccess } = usePostsQuery('');

  const [openAddModal, setOpenAddModal] = useState(false)
  return (
    <>
    
     <div className='taskManager'>
      <Header />
      <div className='isErrorIsLoading'>
    {error && <p>An error occured</p>}
    {isLoading && <p>Loading...</p>}
  </div>

  {isSuccess && (
  <>
      <div className='taskManager__container'>
        <ButtonItem title="Add Post +" onHandleClick={() => setOpenAddModal(true)} className={""}/>

        <div className='taskManager__tasks'>
        {data.map((post: IPostItemModel) => (
      <PostItem
      data={{id: post.id, title: post.title, description: post.description}}
     />
    ))}
        
        </div>
      </div>
      {openAddModal &&
        <AddPostModal onClose={() => setOpenAddModal(false)} open={openAddModal}/>
      }
    </>)}
    </div>
    </>
  );
};
