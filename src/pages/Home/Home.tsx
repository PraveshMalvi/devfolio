import DevfolioForm from "../../components/DevfolioForm/DevfolioForm";
import DevfolioPreview from "../../components/DevfolioPreview/DevfolioPreview";


function Home() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 w-full">
      <DevfolioForm />
      <DevfolioPreview />
    </div>
  );
}

export default Home;
