import "./App.css";

import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import CustomHeader from "./components/CustomHeader.jsx";
import GameListings from "./components/GameListings";
import AddGameReview from "./components/AddGameReview";


function App() {
  return (
    <div className="App">
      <div className="header">
        <CustomHeader/>
      </div>
      <div className="listing">
         <GameListings/> </div>
      <div className="action">
        <AddGameReview/>
      </div>
    </div>
  );
}

export default App;
