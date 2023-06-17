//import styles from './app.module.scss';
//import NxWelcome from './nx-welcome';

import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import News from './news/news';
import CreateNews from './create-news/create-news';
import NewsDb from './newsdb/newsdb';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Top10 from './top10/top10';


export function App() {
  return (
    <>
      {/*<NxWelcome title="web" />*/}
      <div />

      
      <div role="navigation">
        <ul>
          <li>
            <Link href="/">Главная</Link>
          </li>
          <li>
            <Link href="/news">Новости из MongoDb</Link>
          </li>
          <li>
            <Link href="/top10">Топ авторов</Link>
          </li>
          <li>
            <Link href="/news1">Новости из массива</Link>
          </li>
          <li>
            <Link href="/create1">Добавить новость в массив</Link>
          </li>
        </ul>
      </div>
     
      
      <Routes>

       <Route
          path="/"
          element={
            <div>
              <h1>Главная страница</h1>
              lorem ipsum...{' '}
              <Link href="/about">Click here for About</Link>
            </div>
          }
        />

        <Route
          path="/about"
          element={
            <div>
              <Link href="/">Click here to go back to root page.</Link>
            </div>
          }
        />
     <Route 
          path="/news" element={<NewsDb />}
     />
     <Route 
          path="/top10" element={<Top10 />}
     />

      <Route 
           path="/news1" element={<News />}
      />
      <Route
        path="/create1" element={<CreateNews />}
      />
     
      </Routes>
    </>
  );
}

export default App;
