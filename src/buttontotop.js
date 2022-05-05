import React from 'react';
import './buttontotop.css'

class ButtonToTop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
    }

    debounce = false
    will_show = () => {
        if (!this.debounce) {
            this.debounce = true
            return
        }
        if (window.scrollY > window.innerHeight) {
            this.setState({active: true})
        } else {
            this.setState({active: false})
        }
        this.debounce = false
    }

    componentDidMount() {
        window.addEventListener('scroll', this.will_show)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.will_show)
    }

    render() {
        return (
            <div className="button">
                <button className={'arrow_holder ' + (this.state.active ? 'hover' : '')} onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }} disabled={this.state.active ? '' : 'd'}>
                    <svg className={'arrow ' + (this.state.active ? 'active' : '')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M374.6 246.6C368.4 252.9 360.2 256 352 256s-16.38-3.125-22.62-9.375L224 141.3V448c0 17.69-14.33 31.1-31.1 31.1S160 465.7 160 448V141.3L54.63 246.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160C387.1 213.9 387.1 234.1 374.6 246.6z"/></svg>
                </button>
            </div>
        )
    }
}

export default ButtonToTop

