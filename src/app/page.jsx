import HomePage from "@/components/HomePage";
import Video from "@/components/Video";
import Experience from "@/components/Experience";
import Work from "@/components/Work";

const page = () => {
  return (
    <div className="">
      <HomePage />
      <Video />
      <Experience />
      <Work />
      <div className="h-screen"></div>
    </div>
  );
};

export default page;
