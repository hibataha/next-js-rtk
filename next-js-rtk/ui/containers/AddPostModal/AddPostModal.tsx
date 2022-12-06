import { useState } from "react";
import { IPostItemModel } from "../../../models/interfaces";
import Modal from "../Model/Model";

interface IPostItemProps {
  open: boolean;
  onClose: any;
}
const AddPostModal = ({open, onClose}: IPostItemProps) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
    return (
    <Modal modalLabel='Add Post' onClose={onClose} open={open} custom_modal={""}>
      <form className='addTask' name='addTask'>
        <input 
          type='text' 
          name='title' 
          onChange={(e) => setTitle(e.target.value.toUpperCase())} 
          value={title}
          placeholder='Enter title'/>
        <textarea 
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Enter task decription'
          value={description}></textarea>
        <button type='submit'>Done</button>
      </form> 
    </Modal>
    )
};
export default AddPostModal;
