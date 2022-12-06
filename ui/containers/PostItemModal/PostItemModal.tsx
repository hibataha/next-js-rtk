import { useState } from "react";
import { IPostItemModel } from "../../../models/interfaces";
import Modal from "../Model/Model";

interface IPostItemProps {
  data: IPostItemModel;
  open: boolean;
  onClose: any;
}
const PostItemModal = ({data, open, onClose}: IPostItemProps) => {
    return (
    <Modal modalLabel='Post Item' onClose={onClose} open={open} custom_modal={""}>
        <div className='taskItem'>
          <h2>{data.title}</h2>
          <p>{data.description}</p>
        </div>
      </Modal>
    )
};
export default PostItemModal;
