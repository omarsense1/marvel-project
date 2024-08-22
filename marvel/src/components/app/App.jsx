import {Component} from 'react';

import AppHeader from "../appHeader/AppHeader.jsx";
import RandomChar from "../randomChar/RandomChar.jsx";
import CharList from "../charList/CharList.jsx";
import CharInfo from "../charInfo/CharInfo.jsx";

import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary.jsx";

class App extends Component {

    state = {
        selectedChar: null
    }

    onSelectChar = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render() {
        console.log(this.state.selectedChar);
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <ErrorBoundary/>
                            <CharList onSelectChar={this.onSelectChar}/>
                        <ErrorBoundary>
                            <CharInfo charId={this.state.selectedChar}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;
