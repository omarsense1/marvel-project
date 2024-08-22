import {Component} from "react";

import MarvelService from "../../services/MarvelService.js";
import Spinner from "../spinner/Spinner.jsx";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";

import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 1557,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();

        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoaded = (newCharList) => {

        let ended = false;

        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({charList, offset}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }


    render() {

        const {charList, loading, error, newItemLoading, offset, charEnded} = this.state;
        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const charListItems = !(loading || error)
                                                ? charList.map( char => {
                                                    return <CharListItem char={char} onSelectChar={this.props.onSelectChar}/>})
                                                : null;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {spinner}
                    {errorMessage}
                    {charListItems}
                </ul>
                <button
                    className="button button__main button__long"
                    style={{display: charEnded ? 'none' : 'block'}}
                    disabled={newItemLoading}
                    onClick={ () => this.onRequest(offset) }
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const CharListItem = ({char, onSelectChar}) => {

    const {thumbnail, name, thumbnailStyle, id} = char;

    return (
        <li className="char__item" key={id} onClick={() => onSelectChar(id)}>
            <img src={thumbnail} alt={thumbnail} style={thumbnailStyle}/>
            <div className="char__name">{name}</div>
        </li>
    )
}

export default CharList;
