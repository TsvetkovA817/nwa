import './top10.module.scss';
import { useEffect,  useState } from 'react';
import memoize from "lodash.memoize";
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { TextField } from '@mui/material';

/* eslint-disable-next-line */
export interface NewsProps {}

export interface PeaceOfNews {
  title: string,
}


export function Top10(props: NewsProps) {
  
  const [news, setNews] = useState([] as PeaceOfNews[]);
  
  const [title1, setTitle1]=useState('');
  
  
  useEffect(() => {
    fetch('http://localhost:3333/api/news/top10')
      .then(response => response.json())
      .then(news => {
        // const sortedNews = memoizedSortFunction(news);
        console.log(news);
        setNews(news);
      })
  }, []);

 
  function report(item: PeaceOfNews) {
    const newsId=item.title;
    return (<li key={newsId}>
             <h3>{item.title}</h3>
             <hr/>
           </li>);
  } 


  return (
    <div>
       <Typography variant="h4" gutterBottom>
       Топ авторов
      </Typography>
      {/* <h1>Топ авторов</h1> */}
      
      <TextField InputProps={{
            readOnly: true,
          }} id="outlined-basic" label="ИД" variant="outlined" name="id" value={''} />

      <TextField id="outlined-basic" label="Заголовок" variant="outlined" name="title" value={title1} />
      <TextField id="outlined-basic" label="Описание" variant="outlined" name="dsc" value={''}/>{' '}
      <hr />
      <ul>
       { 
         news.map(
            (item) =>{ return (report(item))}
         )
      }
      </ul>
    </div>
  );
 }

export default Top10;
