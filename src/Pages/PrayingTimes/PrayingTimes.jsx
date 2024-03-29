import './Prayingtimes.scss';
import { useMainContext } from '../../Context/MainContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import moment from 'moment-hijri';

const PrayingTimes = () => {
  const { theme } = useMainContext();
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [hijriDate, setHijriDate] = useState('');
  const [dateM, setdateM] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get current location
        navigator.geolocation.getCurrentPosition(async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Fetch city and country using reverse geocoding or other means
          const cityCountryResponse = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client`);
          const cityName = cityCountryResponse.data.locality;
          const countryName = cityCountryResponse.data.countryName;

          // Get current date
          const currentDate = new Date();
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth() + 1; // Months are 0-indexed

          // Fetch prayer times
          const response = await axios.get(
              `https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${encodeURIComponent(cityName)}&country=${encodeURIComponent(countryName)}&method=1`
          );

          // Find index of current day
          const currentDayIndex = currentDate.getDate() - 1;

          // Set prayer times, city, country, and Hijri date
          setPrayerTimes(response.data.data[currentDayIndex].timings);
          setCity(cityName);
          setCountry(countryName);
          setHijriDate(response.data.data[currentDayIndex].date.hijri.date);
          setdateM(response.data.data[currentDayIndex].date.readable);
          setLoading(false);
          console.log(response.data.data[currentDayIndex].date);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
      <div className={`praying ${theme}`} style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="title">
          <h2>{city}، {country}</h2>
          <h3>{hijriDate} التاريخ الهجري </h3>
          <h3>{dateM} التاريخ الميلادي </h3>
        </div>
        {loading ? (
            <Loading/>
        ) : prayerTimes ? (
            <div className="all_times">
              <div className="time">
                <h3>الفجر</h3>
                <p>{prayerTimes.Fajr}</p>
              </div>

              <div className="time">
                <h3>الشروق</h3>
                <p>{prayerTimes.Sunrise}</p>
              </div>

              <div className="time">
                <h3>الظهر</h3>
                <p>{prayerTimes.Dhuhr}</p>
              </div>

              <div className="time">
                <h3>العصر</h3>
                <p>{prayerTimes.Asr}</p>
              </div>

              <div className="time">
                <h3>المغرب</h3>
                <p>{prayerTimes.Maghrib}</p>
              </div>

              <div className="time">
                <h3>العشاء</h3>
                <p>{prayerTimes.Isha}</p>
              </div>
            </div>
        ) : null}
      </div>
  );
};

export default PrayingTimes;
