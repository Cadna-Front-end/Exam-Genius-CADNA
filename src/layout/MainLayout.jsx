import Header from "../components/Layout/Header";

const MainLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={title} />
      <main className="p-6">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;