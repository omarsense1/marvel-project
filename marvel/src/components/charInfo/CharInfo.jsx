import {Component} from "react";

import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import MarvelService from "../../services/MarvelService.js";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";
import Spinner from "../spinner/Spinner.jsx";
import Skeleton from "../skeleton/Skeleton.jsx";

class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.charId !== this.props.charId) {
            this.updateChar();
        }
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }
    onCharLoading = () => {
        this.setState({
            loading: true,
        })
    }

    updateChar = () => {

        const {charId} = this.props;

        if (!charId) {
            return;
        }

        this.onCharLoading()

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)

        this.foo.bar = 0;
    }

    render() {

        const {char, loading, error} = this.state,
            skeleton = loading || error || char ? null : <Skeleton/>,
            errorMessage = error ? <ErrorMessage/> : null,
            spinner = loading ? <Spinner/> : null,
            content = !(error || loading || skeleton) ? <View char={char}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({char}) => {

    const {thumbnail, name, homepage, wiki, thumbnailStyle, longDescription, comics} = char,
        comicsItems = !comics ?
            (
                <li className="char__comics-item">
                    {'No comics yet'}
                </li>
            ) :
            comics.map( (comic, i) => {
                if (i > 9) return;
                return (
                    <li key={i} className="char__comics-item">
                        {comic.name}
                    </li>
                )
            })
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={thumbnailStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {longDescription}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsItems}
            </ul>
        </>
    )
}

export default CharInfo;
