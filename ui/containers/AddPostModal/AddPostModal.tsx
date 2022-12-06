import { useState } from "react";
import { IPostItemModel } from "../../../models/interfaces";
import { useAddPostMutation } from "../../../services/postApi";
import Modal from "../Model/Model";

interface IPostItemProps {
  open: boolean;
  onClose: any;
}
const AddPostModal = ({open, onClose}: IPostItemProps) => {
  const [addPost, result] = useAddPostMutation();
  const handleAddTask = async (e: any) => {
    e.preventDefault();
    const post = {
      title,
      description,
      id: Math.random()
    };
    await addPost(post);
    onClose();
  };

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
    return (
    <Modal modalLabel='Add Post' onClose={onClose} open={open} custom_modal={""}>
      <form className='addTask' name='addTask' onSubmit={handleAddTask}>
        <input 
          type='text' 
          name='title' 
          onChange={(e) => setTitle(e.target.value.toUpperCase())} 
          value={title}
          placeholder='Enter title'/>
        <textarea 
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Enter post description'
          value={description}></textarea>
        <button type='submit'>Done</button>
      </form> 
    </Modal>
    )
};
export default AddPostModal;
