import { useState } from "react";
import { IPostItemModel } from "../../../models/interfaces";
import { ButtonItem } from "../../elements/ButtonItem/ButtonItem";
import PostItemEditModal from "../PostItemEditModal/PostItemEditModal";
import PostItemModal from "../PostItemModal/PostItemModal";

interface IPostItemProps {
  data: IPostItemModel;
}
const PostItem = ({ data }: IPostItemProps) => {
  const [open, setOpen] = useState({ edit: false, view: false });

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
              title="Edit Post"
              onHandleClick={() => setOpen({ ...open, edit: true })}
              className={"task__editButton"}
            />
            <ButtonItem title="Delete Post" className={"task__deleteButton"} />
          </div>

          <ButtonItem
            title="View Post"
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
          onClose={handleClose}
          data={{
            title: data.title,
            description: data.description,
          }}
          open={open.edit}
        />
      )}
     
    </div>
  );
};
export default PostItem;
