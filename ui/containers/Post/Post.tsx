import { useState } from "react";
import { IPostItemModel, PAGETYPE } from "../../../models/interfaces";
import { useDeleteArticleMutation } from "../../../services/articlesApi";
import { useDeleteCourseMutation } from "../../../services/coursesApi";
import { useDeletePostMutation } from "../../../services/postApi";
import { ButtonItem } from "../../elements/ButtonItem/ButtonItem";
import PostItemEditModal from "../PostItemEditModal/PostItemEditModal";
import PostItemModal from "../PostItemModal/PostItemModal";

interface IPostItemProps {
  data: IPostItemModel;
  type: PAGETYPE;
}
const PostItem = ({ data, type }: IPostItemProps) => {
  const [open, setOpen] = useState({ edit: false, view: false });
  const [deletePost] = (type === PAGETYPE.ARTICLE ? useDeleteArticleMutation() : type === PAGETYPE.Courses ? useDeleteCourseMutation() : useDeletePostMutation());
  const handleDeletePost = (e: any) => {
    e.preventDefault();
    deletePost(data.id);
    handleClose();
  };

  const handleClose = () => {
    setOpen({ edit: false, view: false });
  };

  return (
    <div className={`task task--borderColor`}>
      <div className="task__body">
        <h2>{data.title}</h2>
        <p>{data.description}</p>
        <div className="task__buttons">
          <div className="task__deleteNedit">
            <ButtonItem
              title={type === PAGETYPE.ARTICLE ? "Edit Article" : type === PAGETYPE.Courses ? "Edit Course" : "Edit Post"}
              onHandleClick={() => setOpen({ ...open, edit: true })}
              className={"task__editButton"}
            />
            <ButtonItem 
              title={type === PAGETYPE.ARTICLE ? "Delete Article" : type === PAGETYPE.Courses ? "Delete Course" : "Delete Post"}
              onHandleClick={(event) => {handleDeletePost(event)}} className={"task__deleteButton"} />
          </div>

          <ButtonItem
              title={type === PAGETYPE.ARTICLE ? "View Article" : type === PAGETYPE.Courses ? "View Course" : "View Post"}
              onHandleClick={() => setOpen({ ...open, view: true })}
            className={""}
          />
        </div>
      </div>

      {open.view && (
        <PostItemModal
          onClose={handleClose}
          data={{ title: data.title, description: data.description }}
          open={open.view}
        />
      )}
      {open.edit && (
        <PostItemEditModal
          type={type}
          onClose={handleClose}
          data={{
            title: data.title,
            description: data.description,
            id: data.id
          }}
          open={open.edit}
        />
      )}
     
    </div>
  );
};
export default PostItem;
