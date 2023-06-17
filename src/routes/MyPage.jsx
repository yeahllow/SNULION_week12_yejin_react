import { useEffect, useState } from "react";
import { getPosts, getUserProfile } from "../apis/api";
import { MyPageForm } from "../components/Form";
import { SmallPost } from "../components/Posts";

const MyPage = () => {
  const [profile, setProfile] = useState({
    college: "",
    major: "",
    email: "",
    username: "",
  });

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    college: "",
    major: "",
  });

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const getUserProfileAPI = async () => {
      const profile = await getUserProfile();
      setProfile({
        email: profile.user.email,
        username: profile.user.username,
        college: profile.college,
        major: profile.major,
      });

      setFormData({
        email: profile.user.email,
        username: profile.user.username,
        college: profile.college,
        major: profile.major,
      });
    };
    getUserProfileAPI();

    const getPostsAPI = async () => {
      const postList = await getPosts();
      setPostList(postList);
    };
    getPostsAPI();
  }, []);

  return (
    <div className="flex flex-col items-center w-1/2">
      <h3 className=" font-bold text-4xl">My Page</h3>
      <MyPageForm
        profile={profile}
        formData={formData}
        setFormData={setFormData}
      />
      <h3 className="mt-12 font-bold text-4xl">My Posts</h3>
      <div className="grid grid-cols-2 mt-10">
        {postList.map((post) => (
          <SmallPost key={post.id} post={post} setPostList={setPostList} />
        ))}
      </div>
    </div>
  );
};

export default MyPage;
