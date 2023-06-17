import './news.module.scss';
import { useEffect,  useState } from 'react';
import memoize from "lodash.memoize";

/* eslint-disable-next-line */
export interface NewsProps {}

export interface PeaceOfNews {
  id: number,
  title: string,
  description: string,
  createdAt: number
}


export function News(props: NewsProps) {
  
  const [news, setNews] = useState([] as PeaceOfNews[]);

  function sortNews (news: PeaceOfNews[]) {
    return news.sort((a, b) => a.createdAt - b.createdAt);
  }

  const memoizedSortFunction = memoize(sortNews);

  useEffect(() => {
    fetch('http://localhost:3333/api/news/arr')
      .then(response => response.json())
      .then(news => {
        const sortedNews = memoizedSortFunction(news);
        setNews(sortedNews);
      })
  }, []);

  
  function report(item: PeaceOfNews) {
    const mf=memoize((item:PeaceOfNews)=>item);
    return (<li key={mf(item).id}>
             <h2>{mf(item).title}</h2>
             <p>{mf(item).description}</p>
             <hr/>
           </li>);
  } 

  return (
    <div>
      <h1>Последние новости</h1>
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

export default News;
