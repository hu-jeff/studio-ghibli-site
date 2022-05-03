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

                <button className="continue_button">
                    CONTINUE?
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
                <VideoScreen onPlay = {() => {this.onPlayHandler(); console.log('hi')}} visible={this.state.showVideo}/>
            </div>
        )
    }
}

export default FrontScreen