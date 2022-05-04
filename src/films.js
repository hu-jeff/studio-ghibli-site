import React from 'react'
import './films.css'
import {clear} from "@testing-library/user-event/dist/clear";

class CardContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title_height: 0,
            dirprod_height: 0
        }
    }

    componentDidUpdate() {
        if (this.state.height != this.title.clientHeight) {
            this.setState({height: this.title.clientHeight})
        }
        if (this.state.dirprod_height != this.dirprod.clientHeight) {
            this.setState({dirprod_height: this.dirprod.clientHeight})
        }
    }

    render() {
        return (
            <div style={{
                opacity: (this.props.make_opaque ? 0.9 : 0),
                transition: 'opacity 0.2s',
                position: 'relative',
                height: '60vh',
            }}>
                <img src={this.props.big_image} alt={this.props.name + ' image'} className={'card_content_background'}/>
                <h1 className="card_content_title" ref={x => {this.title = x}}>{this.props.name + ' (' + this.props.original + ')'}</h1>
                <h3 className="dirprod" style={{
                    position: 'absolute',
                    top: this.state.title_height + 50,
                    left: 20,
                    fontSize: '.8em',
                    color: 'white'
                }} ref={x => {this.dirprod = x}}>directed by {this.props.director} | produced by {this.props.producer}</h3>
                <p style={{
                    position: 'absolute',
                    color: 'white',
                    left: 20,
                    top: this.state.title_height + this.state.dirprod_height + 70,
                    fontWeight: 800,
                    fontSize: '1.2em',
                    width: '50%',
                }}>
                    {this.props.desc}
                </p>

                <p className="date">{this.props.release_date}</p>
            </div>
        )
    }
}

class Title extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showBigger: false,
            fr: false,
            card_content_visible: false,
            card_content_opaque: false,
            recog: false
        }
    }

    render() {
        let r, k, l
        let n, j, i
        if (this.props.growth && !this.state.recog) {
            this.setState({recog: true})
            clearTimeout(n)
            clearTimeout(j)
            clearTimeout(i)
            this.setState({fr: true})
            r = setTimeout(() => {
                this.setState({showBigger: true})
            }, 300)
            k = setTimeout(() => {
                this.setState({card_content_visible: true})
            }, 300)
            l = setTimeout(() => {
                this.setState({card_content_opaque: true}) //perhaps somehow add this to componentdidupdate
            }, 500)
        } else if (!this.props.growth && this.state.recog) {
            this.setState({recog: false})
            clearTimeout(r)
            clearTimeout(k)
            clearTimeout(l)
            this.setState({card_content_opaque: false})
            n = setTimeout(() => {
                this.setState({card_content_visible: false})
            }, 200)
            j = setTimeout(() => {
                this.setState({showBigger: false})
            }, 400)
            i = setTimeout(() => {
                this.setState({fr: false})
            }, 500)
        }
        return (
            <div>
                {!this.state.showBigger && <div
                    className={'front_screen' + (this.state.fr ? ' front_screen_bigger' : ' front_screen_smaller')}>
                    <button tabIndex={'-1'}>
                        <img className={'title_image'} src={this.props.image} alt={this.props.name + ' image'}/>
                    </button>
                    <Description desc={this.props.description}
                                 release_date={this.props.release_date}
                                 big_image={this.props.big_image}
                                 name={this.props.name}
                                 original={this.props.original}
                                 producer={this.props.producer}
                                 director={this.props.director}
                    />
                </div>}
                {this.state.card_content_visible && <CardContent make_opaque={this.state.card_content_opaque}
                                                                 desc={this.props.description}
                                                                 release_date={this.props.release_date}
                                                                 big_image={this.props.big_image}
                                                                 name={this.props.name}
                                                                 original={this.props.original}
                                                                 producer={this.props.producer}
                                                                 director={this.props.director}
                                                                 rt={this.props.rotton_tomatoes}/>}
            </div>
        )
    }
}

class Description extends React.Component {
    render() {
        return (
            <div className='description_holder'>
                <div className={'background_image'} style={{
                    backgroundImage: `url(${this.props.big_image})`,
                    width: '100%',
                    height: '100%',
                    opacity: 0.5,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100%'
                }}>
                </div>
                <h1 className={'name'}>
                    {this.props.name.toUpperCase()} ({this.props.original})
                </h1>

                <p className={'date'}>{this.props.release_date}</p>
            </div>
        )
    }
}

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            change: () => {
                const x = this.card.getBoundingClientRect()
                this.props.change_details(x.top, x.bottom)
            },
            big: false,
            recog: false,
        }
    }

    count = 1
    scrollCallBack = () => {
        if (this.count % 4 === 0) {
            this.count = 1
            this.state.change()
        } else {
            this.count += 1
        }
    }

    componentDidMount() {
        this.state.change()
        window.addEventListener('scroll', this.scrollCallBack)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollCallBack)
    }

    render() {
        const details = this.props.details
        let k, i
        if (this.props.growth && !this.state.recog) {
            this.setState({recog: true})
            clearTimeout(i)
            k = setTimeout(() => {
                this.setState({big: true})
            }, 200)
        } else if (!this.props.growth && this.state.recog) {
            this.setState({recog: false})
            clearTimeout(k)
            i = setTimeout(() => {
                this.setState({big: false})
            }, 200)
        }
        return (
            <div className={"card" + (this.state.big ? ' big_card' : '')} ref={(card) => {
                this.card = card
            }}>
                <Title name={details.title}
                       original={details.original_title}
                       image={details.image}
                       director={details.director}
                       producer={details.producer}
                       rotton_tomatoes={details.rt_score}
                       description={details.description}
                       release_date={details.release_date}
                       big_image={details.movie_banner}
                       growth={this.props.growth}
                />

            </div>
        )
    }
}

class FilmList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bigger: Array(this.props.ghibli_films.length).fill(false),
        }
    }

    change_size_and_position(i, top, bottom) {
        const height = window.innerHeight
        if (top < height / 2 && bottom > height / 2) {
            if (this.state.bigger[i]) {
                return
            }
            const new_array = Array(this.props.ghibli_films.length).fill(false)
            new_array[i] = true
            this.setState({bigger: new_array})
        }
    }

    render() {
        const ghibli_films = this.props.ghibli_films
        const film_details = ghibli_films.map((film, i) => {
            return <Card details={film} key={i} growth={this.state.bigger[i]} change_details={(s, p) => {
                this.change_size_and_position(i, s, p)
            }}/>
        })

        return (
            <div className={'film_list'}>
                {film_details}
            </div>
        )
    }
}

export default FilmList