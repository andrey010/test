
import "./App.css";
import ApplicationRouter from "./ApplicationRouter";
import { LoggedProvider } from "./logedContext";

const App = () => {

  // useEffect(() => {

  // },[])
  return (
    <LoggedProvider>
      <ApplicationRouter />
    </LoggedProvider>
  );
};

export default App;
