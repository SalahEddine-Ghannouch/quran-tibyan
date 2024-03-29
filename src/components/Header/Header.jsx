import "./Header.scss";
import { useMainContext } from "../../Context/MainContext";
import { Link } from "react-router-dom";
import axios from "axios";


const Header = () => {
  const {
    theme,
    setSetingBlock,
    settingBlock,
    setSearchBlock,
    searchBlock,
    asideBlock,
    setAsideBlock,
  } = useMainContext();

  const handleSettingClass = ()=>{
    setAsideBlock(false);
    setSetingBlock(!settingBlock)
  }

  const handleSearchClass = ()=>{
    setAsideBlock(false);
    setSearchBlock(!searchBlock)
  }

  const handleAsideClass = ()=>{
    setSearchBlock(false);
    setSetingBlock(false);
    setAsideBlock(!asideBlock)
  }
   

  //! you can use this api to get MP3 Tasjill, feel free
  // useEffect(()=>{
  //   axios.get("https://www.mp3quran.net/api/v3/reciters?language=ar")
  //   .then((res) => console.log(res.data.reciters))
  //  })
  

  
  return (
    <div className={"header " + theme}>
      <div className="container">
        <div className="header_content">
          <div className="icons">
            <div className="icon" onClick={() => handleSearchClass()}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <div className="icon" onClick={() => handleSettingClass()}>
              <i className="fa-solid fa-gear"></i>
            </div>
            <div className="icon">
              <i className="fa-solid fa-globe"></i>
            </div>
          </div>
          <div className="logo">
            <Link to="/">
              <h2> القران الكريم </h2>
            </Link>
            <div className="icon" onClick={()=>handleAsideClass()} >
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
