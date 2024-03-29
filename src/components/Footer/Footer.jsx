import "./Footer.scss";
import { useMainContext } from "../../Context/MainContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { data } from "../../components/Data/QuranReaders"

const Footer = () => {
  const { theme, setSurahNumber ,setReaderName, setReaderImg, setReaderInfo,} = useMainContext();
  const navigate = useNavigate();
 
  const handleNavigate = (path) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
    navigate(path)
  }

  const handleReaderNavigate = (name)=> {
     data.map((item) => {
      if(item.title === name){
        setReaderImg(item.img)
        setReaderInfo(item.info)
        setReaderName(item.title)
      }
    })
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
    navigate("/reader")
    
  }
 
  return (
    <footer className={theme}>
      <div className="footer_content container ">
        <div className="footer_text">
      <div className="footer_header">
      <h2> القران الكريم </h2>
          <h3>تلاوة, تدبر وعمل. </h3>
      </div>
          <p>
              موقع "قرآن وتبيان" هو صدقة جارية،
              يسعى لنشر الخير والعلم في رحاب القرآن الكريم. سائلين من الله عز وجل التوفيق والسداد
          </p>
        </div>
        <div className="footer_links">
            <ul>
            <li>
              <h2> روابط شائعة </h2>
            </li>
            <li>
              <Link to='/read-ayah' > اية الكرسي </Link>
            </li>
            <li>
              <Link to='/read-surah' onClick={()=> setSurahNumber(36)} > سورة يس </Link>
            </li>
            <li>
              <Link to='/read-surah' onClick={()=> setSurahNumber(67)} > سورة الملك </Link>
            </li>
            <li>
              <Link to='/read-surah' onClick={()=> setSurahNumber(18)} > سورة الكهف </Link>
            </li>
            <li>
              <Link to='/read-surah' onClick={()=> setSurahNumber(73)} > سورة المزمل </Link>
            </li>
            <li>
              <Link to='/read-surah' onClick={()=> setSurahNumber(56)} > سورة الواقعة </Link>
            </li>
          </ul>
         <ul>
          <li> <h2> القراء </h2> </li>
          <li> <Link to="/reader" onClick={()=> handleReaderNavigate("محمود علي البنا")} > محمود علي البنا </Link> </li>
          <li> <Link to="/reader" onClick={()=> handleReaderNavigate("عبدالباسط عبدالصمد")} > عبدالباسط عبدالصمد </Link> </li>
          <li> <Link to="/reader" onClick={()=> handleReaderNavigate("خليل محمود الحصري")} > خليل محمود الحصري </Link> </li>
          <li> <Link to="/reader" onClick={()=> handleReaderNavigate("محمد صديق المنشاوي")} > محمد صديق المنشاوي </Link> </li>
          <li> <Link to="/reader" onClick={()=> handleReaderNavigate("عبد الله كامل")} > عبد الله كامل </Link> </li>
          <li> <Link to="/reader" onClick={()=> handleReaderNavigate("ماهر المعقلي")} > ماهر المعقلي </Link> </li>
         </ul>
          <ul>
            <li> <h2> التنقل </h2>  </li>
            <li onClick={()=> handleNavigate("/")} >  <Link  > الصفحة الرئيسية </Link> </li>
            <li onClick={()=> handleNavigate("/radio")} > <Link> راديو القران </Link> </li>
            <li onClick={()=> handleNavigate("/AllReader")} > <Link>  القراء </Link> </li>
            <li onClick={()=> handleNavigate("/boukhary")} > <Link>  صحيح البخاري </Link> </li>
            <li onClick={()=> handleNavigate("/muslim")} > <Link>  صحيح مسلم </Link> </li>
            <li onClick={()=> handleNavigate("/azkar")} > <Link>  الاذكار </Link> </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
