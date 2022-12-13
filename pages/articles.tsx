import { useRouter } from "next/router";
import { useState } from "react";
import { IPostItemModel, PAGETYPE } from "../models/interfaces";
import { articlesApi, getArticles, useGetArticlesQuery } from "../services/articlesApi";
import { wrapper } from "../src/store";
import styles from "../styles/Home.module.css";
import AddPostModal from "../ui/containers/AddPostModal/AddPostModal";
import Header from "../ui/containers/Header/Header";
import PostItem from "../ui/containers/Post/Post";
import { ButtonItem } from "../ui/elements/ButtonItem/ButtonItem";
import MainLayout from "../ui/layouts/MainLayout";
function Articles() {
  const result = useGetArticlesQuery("");
  const { data, error, isLoading, isSuccess } = result;
  const [openAddModal, setOpenAddModal] = useState(false);
  return (                                
    <div className={styles.container}>
      <div>
        <MainLayout>
          <main style={{ height: "100%" }}>
            <div className="taskManager">
              <Header type={PAGETYPE.ARTICLE}/>
              <div className="isErrorIsLoading">
                {error && <p>An error occured</p>}
                {isLoading && <p>Loading ....</p>}
              </div>

              {data && (
                <>
                  <div className="taskManager__container">
                    <ButtonItem
                      title="Add Article +"
                      onHandleClick={() => setOpenAddModal(true)}
                      className={""}
                    />

                    <div className="taskManager__tasks">
                      {data.map((post: IPostItemModel) => (
                        <PostItem
                          type={PAGETYPE.ARTICLE} 
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
                      type={PAGETYPE.ARTICLE}
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
    store.dispatch(getArticles.initiate(""));
    await Promise.all(store.dispatch(articlesApi.util.getRunningQueriesThunk()));

    return {
      props: {},
    }
   
  }

);

export default Articles;
