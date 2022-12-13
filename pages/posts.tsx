import { useRouter } from "next/router";
import { useState } from "react";
import { IPostItemModel, PAGETYPE } from "../models/interfaces";
import { getPosts, postApi, useGetPostsQuery } from "../services/postApi";
import { wrapper } from "../src/store";
import styles from "../styles/Home.module.css";
import { PostsList } from "../ui/components/PostsList/PostsList";
import AddPostModal from "../ui/containers/AddPostModal/AddPostModal";
import Header from "../ui/containers/Header/Header";
import PostItem from "../ui/containers/Post/Post";
import { ButtonItem } from "../ui/elements/ButtonItem/ButtonItem";
import MainLayout from "../ui/layouts/MainLayout";
import PostTemplate from "../ui/templates/PostTemplate";
function Posts() {
  const router = useRouter();
  const result = useGetPostsQuery("");
  const { data, error, isLoading, isSuccess } = result;
  const [openAddModal, setOpenAddModal] = useState(false);
  return (
    <div className={styles.container}>
      <div>
        <MainLayout>
          <main style={{ height: "100%" }}>
            <div className="taskManager">
              <Header type={PAGETYPE.POST}/>
              <div className="isErrorIsLoading">
                {error && <p>An error occured</p>}
                {isLoading && <p>Loading...</p>}
              </div>

              {isSuccess && (
                <>
                  <div className="taskManager__container">
                    <ButtonItem
                      title="Add Post +"
                      onHandleClick={() => setOpenAddModal(true)}
                      className={""}
                    />

                    <div className="taskManager__tasks">
                      {data.map((post: IPostItemModel) => (
                        <PostItem
                          type={PAGETYPE.POST} 
                          data={{
                            id: post.id,
                            title: post.title,
                            description: post.description,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  {openAddModal && (
                    <AddPostModal
                      onClose={() => setOpenAddModal(false)}
                      open={openAddModal}
                      type={PAGETYPE.POST}
                    />
                  )}
                </>
              )}
            </div>
          </main>
        </MainLayout>
      </div>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(getPosts.initiate(""));
    await Promise.all(store.dispatch(postApi.util.getRunningQueriesThunk()));
    return {
      props: {},
    };
  }
);

export default Posts;
