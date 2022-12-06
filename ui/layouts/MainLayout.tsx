interface IMainLayoutProps {
    children?: React.ReactElement | React.ReactElement[];
  }
const MainLayout = ({children}: IMainLayoutProps) => {
    return (
      <div>
        <main style={{height: '100%', overflowX: 'hidden'}}>{children}</main>
      </div>
    );
};
  
export default MainLayout;
  