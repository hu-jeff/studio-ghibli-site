import React from 'react'
import './films.css'


class Title extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'front_screen'}>
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
            </div>
        )
    }
}

class Description extends React.Component {
    constructor(props) {
        super(props);
    }
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
    }

    render() {
        const details = this.props.details
        return (
            <div className="card">
                <Title name={details.title}
                       original={details.original_title}
                       image={details.image}
                       director={details.director}
                       producer={details.producer}
                       rotton_tomatoes={details.rt_score}
                       description={details.description}
                       release_date={details.release_date}
                       big_image={details.movie_banner}
                />

            </div>
        )
    }
}

class FilmList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const ghibli_films = this.props.ghibli_films
        const film_details = ghibli_films.map((film, n) => {
            return <Card details={film} key={n} />
        })
        console.log(film_details)


        return (
            <div className={'film_list'}>
                {film_details}
            </div>
        )
    }
}

export default FilmList