import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../utils/appSlice';
import { useEffect, useState } from 'react';
import { YOUTUBE_SEARCH_API } from '../utils/constants';
import { cacheResults } from '../utils/searchSlice';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCache = useSelector((store) => store.search);

  const dispatch = useDispatch();

  useEffect(() => {
    const searchTimmer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(searchTimmer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery).then((res) =>
      res.json()
    );
    setSuggestions(data[1]);
    dispatch(cacheResults({ [searchQuery]: data[1] }));
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const onClickLI = (e) => {
    e.stopPropagation();
    console.log('click');
  };

  return (
    <div className='grid grid-flow-col p-2 m-2 shadow-lg'>
      <div className='flex col-span-1'>
        <img
          onClick={() => toggleMenuHandler()}
          className='h-8 q cursor-pointer'
          src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0OBQgMAAWlpKQpJSaenZ309PUAAAAIAAD8/Pz5+fna2tqop6dvbW1oZmevrq4tKivFxMQYExRiYGC+vr7Dc4WrAAABB0lEQVR4nO3cS3LCMBAFQGIIIBPbhN/9jxqSyiIsTUnlydB9g1eSNV5MvdUKAAAAAAAAAAAAAAAAXtEwvscwDk3yHabSb2Loy/TRIOHUv8XRH+sHHMrSqR6U+hd1jHSE90P8lHC2/Lc0/0vzMy3WMdynxaFBwu+Jv4uh0cQHAAAAAAAAAIB59jG0ijdcT9sYTtcmK0PncumiuJRz/YD7bbf0ut4f3br+GvQt2PblrXrC3WbpUA/6sXrC/GeY/zvM/5aGmofHZiu0S//M/GoVDwAAAAAAAAAAZsjeuRerN1HL7hPy95fm76DNnzD/Lc3/0rxAJ3v+Xn0AAAAAAAAAAAAAAAD4T74AYhs1O+vt3ioAAAAASUVORK5CYII='
          alt='menu'
        />
        <a href='/'>
          <img
            className='h-8 mx-2'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/768px-YouTube_Logo_2017.svg.png'
            alt='logo'
          />
        </a>
      </div>
      <div className='col-span-10 pl-28'>
        <div>
          <input
            className='px-5 w-1/2 border border-gray-400 rounded-l-full p-2'
            type='text'
            placeholder='Search'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button className='border border-gray-400 rounded-r-full p-2'>
            Search
          </button>
        </div>
        {showSuggestions && suggestions.length > 0 && (
          <div className='absolute bg-white py-2 px-5 shadow-lg rounded-lg border border-gray-100'>
            <ul className='w-auto'>
              {suggestions.map((v, i) => (
                <li
                  key={i}
                  className='py-2 shadow-sm hover:bg-gray-100 cursor-pointer'
                  value={v}
                  onClick={onClickLI}
                >
                  {v}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className='col-span-1'>
        <img
          className='h-8'
          alt='user-icon'
          src='https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png'
        />
      </div>
    </div>
  );
};

export default Header;
