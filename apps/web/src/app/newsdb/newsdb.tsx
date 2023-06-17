import './newsdb.module.scss';
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
  _id: string,
  title: string,
  description: string,
  author:string,
  createdAt: number
}


export function NewsDb(props: NewsProps) {
  
  const [news, setNews] = useState([] as PeaceOfNews[]);
    
  const [id1, setId1]=useState('');
  const [title1, setTitle1]=useState('');
  const [dsc1, setDsc1]=useState('');
  const [aut1, setAut1]=useState('');

  function sortNews (news: PeaceOfNews[]) {
    return news.sort((a, b) => a.createdAt - b.createdAt);
  }

  const memoizedSortFunction = memoize(sortNews);

  useEffect(() => {
    fetch('http://localhost:3333/api/news/all')
      .then(response => response.json())
      .then(news => {
        const sortedNews = memoizedSortFunction(news);
        console.log(news);
        setNews(sortedNews);
      })
  }, []);

  
function delNews(id:string) {

  const removeItem = news.filter((item) => {
    return item._id !== id;
  });
  setNews(removeItem);
}

function findNews(id:string) {

  const findItem = news.find((item) => {
    return item._id === id;
  });
  if(findItem){
     setId1(findItem._id);
     setTitle1(findItem.title);
     setDsc1(findItem.description);
     setAut1(findItem.author);
  }
}


function handleDeleteClick(id:string) {

  const apiUrl = 'http://localhost:3333/api/news/del/'+id;
  
  const formData = new FormData();
  formData.append('newsId', id);

  const options = {
    method: 'DELETE',
    body: formData
  }
  console.log(apiUrl);

  fetch(apiUrl, options)
    .then(res => res.json())
    .then(
      (result) => {
        delNews(id);
      },
      (error) => {
        console.error(error);
      }
    )
}

async function handleAddClick() {
  const el={title:'', description:'', author:''};
  el.title=title1;
  el.description=dsc1;
  el.author=aut1;

  const elJson=JSON.stringify(el);

  const apiUrl = 'http://localhost:3333/api/news/add';
  
  const formData = new FormData();
  formData.append('title', el.title);
  formData.append('description', el.description);
  formData.append('author', el.author);

  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: elJson
    }

  console.log(apiUrl);

  await fetch(apiUrl, options)
    .then(res => res.json())
    .then(
      (result) => {
        const el2:PeaceOfNews={_id:result._id, title:result.title, description:result.description, author:result.author, createdAt:result.createdAt};
        setId1(el2._id);
        setTitle1(el2.title);
        setDsc1(el2.description);
        setAut1(el2.author);
        const news2 = [...news, el2];
        setNews(news2);   
        console.log(news);
      },
      (error) => {
        console.error(error);
      }
    )
  return;
} 


async function handleSaveClick() {

  const el={title:'', description:'', author:''};
  el.title=title1;
  el.description=dsc1;
  el.author=aut1;
  const elJson=JSON.stringify(el);

  const apiUrl = 'http://localhost:3333/api/news/edit/'+id1;
  
  const formData = new FormData();
  formData.append('title', el.title);
  formData.append('description', el.description);
  formData.append('author', el.author);

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: elJson
    }

  console.log(apiUrl);

  await fetch(apiUrl, options)
    .then(res => res.json())
    .then(
      (result) => {
        const el2:PeaceOfNews={_id:result._id, title:result.title, description:result.description, author:result.author, createdAt:result.createdAt};
        
        el2.title=title1;
        el2.description=dsc1;
        el2.author=aut1;
        const index = news.findIndex((item) => item._id === id1);
        news[index] = el2;

        const news2 = [...news];
        setNews(news2);   
        
        console.log(news);
      },
      (error) => {
        console.error(error);
      }
    )
  return;
} 

function handleEditClick(id:string) {
     findNews(id);
}  

  function report(item: PeaceOfNews) {
    const mf=memoize((item:PeaceOfNews)=>item);
    const newsId=mf(item)._id;
    return (<li key={newsId}>
             <h3>{mf(item).title}</h3>
             <p>{mf(item).description}</p>
             <p>{mf(item).author}</p>
             <button onClick={() => handleDeleteClick(newsId)} >X</button>{' '}
             <button onClick={() => handleEditClick(newsId)}>Edit</button>
             <hr/>
           </li>);
  } 


  return (
    <div>
       <Typography variant="h4" gutterBottom>
       Последние новости
      </Typography>
      {/* <h1>Последние новости</h1> */}
      
      <TextField InputProps={{
            readOnly: true,
          }} id="outlined-basic" label="ИД" variant="outlined" name="id" value={id1} />
      {/* <input type="text" name="id" value={ id1} onChange={e => setId1( e.target.value) }/> */}
      {/* <TextField id="outlined-basic" label="ИД" variant="outlined" name="id" value={id1} onChange={e => setId1(e.target.value)}/> */}

      <TextField id="outlined-basic" label="Заголовок" variant="outlined" name="title" value={title1} onChange={e => setTitle1(e.target.value)}/>
      {/* <input type="text" name="title" value={title1} onChange={e => setTitle1(e.target.value)}/> */}
      <TextField id="outlined-basic" label="Описание" variant="outlined" name="dsc" value={dsc1} onChange={e => setDsc1(e.target.value)}/>{' '}
      {/* <input type="text" name="dsc" value={dsc1} onChange={e => setDsc1(e.target.value)}/> */}
      <TextField id="outlined-basic" label="Автор" variant="outlined" name="avt" value={aut1} onChange={e => setAut1(e.target.value)}/>{' '}
      <Button variant="contained" onClick={() => handleAddClick()}>Add</Button>{' '}
      <Button variant="contained" onClick={() => handleSaveClick()}>Save</Button>
      {/* <button onClick={() => handleAddClick()}>Add</button>
      <button onClick={() => handleSaveClick()}>Save</button> */}
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

export default NewsDb;
