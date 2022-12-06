import { useState } from "react";
import { IPostItemModel } from "../../../models/interfaces";
import { useUpdatePostMutation } from "../../../services/postApi";
import Modal from "../Model/Model";

interface IPostItemProps {
  data: IPostItemModel;
  open: boolean;
  onClose: any;
}
const PostItemEditModal = ({data, open, onClose}: IPostItemProps) => {
  const [title, setTitle] = useState(data.title)
  const [id, setID] = useState(data.id)

  const [description, setDescription] = useState(data.description)
  const [updatePost] = useUpdatePostMutation();
  const handleUpdatePost = (e: any) => {
    e.preventDefault();
    const task = {
      title,
      description,
      id
    };
    updatePost(task);
    onClose();
  };
    return (
    <Modal modalLabel='Edit Post' onClose={onClose} open={open} custom_modal={""} >
      <form className='editTask' name='updateTask' onSubmit={handleUpdatePost}>
        <input 
          type='text' 
          name='title' 
          onChange={(e) => setTitle(e.target.value.toUpperCase())} 
          value={title}/>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
        <button type='submit'>Edit</button>
      </form> 
    </Modal>
    )
};
export default PostItemEditModal;
