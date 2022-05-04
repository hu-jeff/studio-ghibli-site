import React from 'react';
import './frontscreen.css'

import media from './media/ghiblinoblack.mp4'

class LoadingScreen extends React.Component {
    render() {
        return (
            <div className={"loading_screen " + (this.props.visible ? 'visible' : 'notvisible')}>
                <h1 >STUDIO GHIBLI</h1>
                <h2>LOADING</h2>
            </div>
        )
    }
}

class VideoScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <video className={'background_video ' + (this.props.visible ? 'visible' : 'notvisible')} loop autoPlay muted  controlsList={'nodownload'} onCanPlayThrough={() => this.props.onPlay()} onContextMenu={(e) => e.preventDefault()}>
                    <source src={media} type={'video/mp4'}/>
                </video>
                <div className={"slide "+ (this.props.visible ? 'fullvisible moveslide' : 'notvisible')}>
                    <h1 className={"caption"}>Since 1975</h1>
                </div>

                <a className={this.props.visible ? 'fullvisible': 'notvisible'} href="https://www.imdb.com/list/ls076439519/" target={'_blank'}><img src={require("./media/ghibli.png")} alt="Ghibli Icon" className={'logo'}/></a>

                <button className="continue_button" onClick={() => {
                    window.scrollTo({
                        top: window.innerHeight,
                        left: 0,
                        behavior: 'smooth'
                    })
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM390.6 246.6l-112 112C272.4 364.9 264.2 368 256 368s-16.38-3.125-22.62-9.375l-112-112c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L256 290.8l89.38-89.38c12.5-12.5 32.75-12.5 45.25 0S403.1 234.1 390.6 246.6z"/></svg>
                </button>

            </div>
        )
    }
}

class FrontScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            showVideo: false,
        }
    }

    onPlayHandler() {
        this.setState({loading: false})
        setTimeout(
            () => {
                this.setState({showVideo: true})
                this.props.scroll(false)
            }, 1300 // 1300
        )
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="opening">
                {!this.state.showVideo && <LoadingScreen visible={this.state.loading}/>}
                <VideoScreen onPlay = {() => this.onPlayHandler()} visible={this.state.showVideo}/>
            </div>
        )
    }
}

export default FrontScreen