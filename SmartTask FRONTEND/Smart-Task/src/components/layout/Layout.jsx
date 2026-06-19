import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ children, title }) {
  return (
    <>
      <Sidebar />
      <div className="main-content">
        <Header title={title} />
        {children}
      </div>
    </>
  );
}

export default Layout;