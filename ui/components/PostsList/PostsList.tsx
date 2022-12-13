import { useRouter } from "next/router";
import React, {useState} from "react";
import { IPostItemModel, PAGETYPE } from "../../../models/interfaces";
import { useGetPostsQuery } from "../../../services/postApi";
import AddPostModal from "../../containers/AddPostModal/AddPostModal";
import Header from "../../containers/Header/Header";
import PostItem from "../../containers/Post/Post";
import { ButtonItem } from "../../elements/ButtonItem/ButtonItem";

export const PostsList = () => {
  const router = useRouter();
  const result = useGetPostsQuery({}, {
    // If the page is not yet generated, router.isFallback will be true
    // initially until getStaticProps() finishes running
    skip: router.isFallback,
  });
  const { data, error, isLoading, isSuccess } = result;
  const [openAddModal, setOpenAddModal] = useState(false)
  return (
    <>
    
     <div className='taskManager'>
      <Header type={PAGETYPE.ARTICLE} />
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
      type={PAGETYPE.ARTICLE}
      data={{id: post.id, title: post.title, description: post.description}}
     />
    ))}
        
        </div>
      </div>
      {openAddModal &&
        <AddPostModal type={PAGETYPE.ARTICLE} onClose={() => setOpenAddModal(false)} open={openAddModal}/>
      }
    </>)}
    </div>
    </>
  );
};
