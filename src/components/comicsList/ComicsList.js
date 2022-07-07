import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ClipLoader } from 'react-spinners';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './comicsList.scss';

const ComicsList = () => {

    const [comicsList, setComicsList ] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(100);
    const [buttonHidden, setButtonHidden] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true); 
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
    } 

    const hideButton = () => {
        setButtonHidden(true);
    }

    const onComicsListLoaded = (newComicsList) => {
        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 8);
    }

    function renderComics(comicsList) {
        const comics = comicsList.map(item => {
            return (
                <li className="comics__item" key={item.id}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">Price: {item.price}</div>
                    </Link>
                </li>
            )    
        });

        return comics;      
    }

    const items = renderComics(comicsList);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <ClipLoader cssOverride={{display: 'block', margin: '0 auto'}}/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            <InfiniteScroll
                    dataLength={comicsList.length}
                    next={() => onRequest(offset)}
                    hasMore={buttonHidden}
                />
            <ul className="comics__grid">
                {items}
            </ul>
            <button 
                onClick={() => hideButton()}
                style={{'display': buttonHidden ? 'none' : 'block'}}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;