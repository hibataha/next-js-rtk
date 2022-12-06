import { useState } from "react";
import { IPostItemModel } from "../../../models/interfaces";
import Modal from "../Model/Model";

interface IPostItemProps {
  data: IPostItemModel;
  open: boolean;
  onClose: any;
}
const PostItemEditModal = ({data, open, onClose}: IPostItemProps) => {
  const [title, setTitle] = useState(data.title)
  const [description, setDescription] = useState(data.description)
    return (
    <Modal modalLabel='Edit Post' onClose={onClose} open={open} custom_modal={""}>
      <form className='editTask' name='updateTask'>
        <input 
          type='text' 
          name='title' 
          onChange={(e) => setTitle(e.target.value.toUpperCase())} 
          value={data.title}/>
        <textarea onChange={(e) => setDescription(e.target.value)} value={data.description}></textarea>
        <button type='submit'>Edit</button>
      </form> 
    </Modal>
    )
};
export default PostItemEditModal;
