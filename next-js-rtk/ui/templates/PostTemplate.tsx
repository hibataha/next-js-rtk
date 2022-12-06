import React from "react";
import { PostsList } from "../components/PostsList/PostsList";
import MainLayout from "../layouts/MainLayout";

const PostTemplate = () => {
  return (
    <div>
      <MainLayout>
        <main style={{height: '100%'}}>
            <PostsList />
        </main>
      </MainLayout>
    </div>
  );
};

export default PostTemplate;
