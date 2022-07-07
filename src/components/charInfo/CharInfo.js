import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import './charInfo.scss';

const CharInfo = ({charId}) => {

    const [char, setChar] = useState(null);
    const {loading, error, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [charId])

    const updateChar = () => {
        if (!charId) {
            return;
        }
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const skeleton = char || loading || error ? null : <Skeleton />
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <ClipLoader cssOverride={{display: 'block', margin: '0 auto',}}/> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;
    
    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner} 
            {content}    
        </div>
    )
};

const View = ({char}) => {

    const {name, description, thumbnail, homepage, wiki, comics} = char

    let imgStyle = {objectFit: 'cover'}
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {objectFit: 'fill'};
    } 

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
               {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics whith this character'}
                {
                    comics.map((item, index) => {
                        if (index > 9) return;
                        return (
                            <li key={index} className="char__comics-item"> 
                                <Link to={`comics/${item.resourceURI.match(/(?<=comics\/)[\w+.-]+/gm)[0]}`}> 
                                    {item.name}
                                </Link>
                            </li>    
                        )
                    })
                }    
            </ul>
        </>
    )
};

export default CharInfo;