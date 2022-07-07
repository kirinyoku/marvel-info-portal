import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { useParams, Link } from 'react-router-dom';
import './SingleComicPage.scss';

const SingleComicPage = () => {

    const {id} = useParams();
    const [comic, setComic] = useState(null);

    const {loading, error, getComic, clearError} = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [id])

    const updateComic = () => {
        clearError(); 
        getComic(id)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <ClipLoader cssOverride={{display: 'block', margin: '0 auto',}}/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

    return (
        <>
            {errorMessage}
            {spinner} 
            {content} 
        </>    
    )
}

const View = ({comic}) => {
    const {title, description, pageCount, thumbnail, language, price} = comic;
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">Pages: {pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>    
    )
}

export default SingleComicPage;