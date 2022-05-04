import React from 'react'
import './films.css'

class CardContent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{
                opacity: (this.props.make_opaque ? 0.9 : 0),
                transition: 'opacity 1s'
            }} className={this.props.make_opaque ? 'card_content_visible' : ''}>
                <h1 style={{color: 'white'}}>HI</h1>
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
        }
    }

    render() {
        let r, k, l
        if (this.props.growth) {
            this.setState({fr: true})
            r = setTimeout(() => {
                this.setState({showBigger: true})
            }, 400)
            k = setTimeout(() => {
                this.setState({card_content_visible: true})
            }, 800)
            l = setTimeout(() => {
                this.setState({card_content_opaque: true}) //perhaps somehow add this to componentdidupdate
            }, 1000)
        }
        return (
            <div>
                {!this.state.showBigger && <div className={'front_screen' + (this.state.fr ? ' front_screen_bigger': ' front_screen_smaller')}>
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
                {this.state.card_content_visible && <CardContent make_opaque={this.state.card_content_opaque}/>}
            </div>
        )
    }
}

class Description extends React.Component {
    render() {
        return (
            <div className='description_holder' >
                <div className={'background_image'} style={{backgroundImage: `url(${this.props.big_image})`,
                                                            width: '100%',
                                                            height:'100%',
                                                            opacity: 0.5,
                                                            backgroundRepeat: 'no-repeat',
                                                            backgroundSize: '100%'}}>
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
        }
    }

    count = 1
    scrollCallBack = () => {
        if (this.count % 6 === 0) {
            this.count = 1
            this.state.change()
            console.log('gucci')
        } else {
            this.count += 1
        }
    }

    componentDidMount() {
        this.state.change()
        window.addEventListener('scroll', this.scrollCallBack)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll',this.scrollCallBack)
    }

    render() {
        const details = this.props.details
        let k
        if (this.props.growth) {
            k = setTimeout(() => {
                this.setState({big: true})
            }, 400)
        }
        return (
            <div className={"card" + (this.state.big ? ' big_card' : '')} ref={(card) => {this.card = card}}>
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
            sizes_and_positions: Array(this.props.ghibli_films.length).fill([0,0])
        }
        this.card_refs = Array(this.props.ghibli_films.length).fill(React.createRef())
    }

    change_size_and_position(i, top, bottom) {
        const height = window.innerHeight
        if (top < height/2 && bottom > height/2) {
            const new_array = Array(this.props.ghibli_films.length).fill(false)
            new_array[i] = true
            this.setState({bigger: new_array})
        }
    }

    render() {
        const ghibli_films = this.props.ghibli_films
        const film_details = ghibli_films.map((film, i) => {
            return <Card details={film} key={i} growth={this.state.bigger[i]} change_details ={(s, p) => {this.change_size_and_position(i, s, p)}}/>
        })

        return (
            <div className={'film_list'}>
                {film_details}
            </div>
        )
    }
}

export default FilmList