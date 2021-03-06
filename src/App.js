import React from 'react';
import './App.scss';
import WeatherDisplay from './WeatherDisplay.js';


let PLACES = [];
console.log(PLACES);
let CLR = ['#FF1800','#1808fb','#00C12B','black'];
let FRCST=['current','daily'];
for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    PLACES.push({
        name: key,
        zip: localStorage.getItem(key)
    });
}

class App extends React.Component {
        constructor() {
            super();
            this.state = {
                activePlace: 0,
                    value: '',
                    color: '',
                    transform: '',
                    current: '0',
                };
                }

                handleChange(event) {
                    this.setState({
                        value: event.target.value
                    })
                }

                handleSubmit(event) {
                    if (this.state.value !== '') {
                        localStorage.setItem(this.state.value, this.state.value);

                        PLACES = [];
                        for (let i = 0; i < localStorage.length; i++) {
                            let key = localStorage.key(i);
                            PLACES.push({
                                name: key,
                                zip: localStorage.getItem(key)
                            });
                        }
                        this.setState({
                            value: ''
                        });
                    }
                    console.log(PLACES);
                    event.preventDefault();
                }

        handleDelete(event) {
            localStorage.removeItem((PLACES[this.state.activePlace].name));
            PLACES = [];
            for (let i = 0; i < localStorage.length; i++) {
                let key = localStorage.key(i);
                PLACES.push({
                    name: key,
                    zip: localStorage.getItem(key)
                });
                }
                this.setState({
                    value: ''
                });
                this.setState({
                    activePlace: 0
                });
                event.preventDefault();
                }

                handleWheelScroll(event) {
                    if (event.deltaY === 100 && window.pageYOffset !== 0) {
                            setTimeout(()=>{
                                this.setState({
                                    transform: 'translateY(-100%)'
                                })
                            },100);
                    } else if (event.deltaY === -100) {
                        setTimeout(()=>{
                            this.setState({
                                transform: ''
                            })
                        },100);
                    }
                }

                componentDidMount(){
                    let i=0;
                    setInterval (function() {
                        i++;
                        this.setState({ color: CLR[i] });
                        console.log(i);
                        if ( i === 4 ) {
                        i = 0;   
                        }
                        }.bind(this),5000);
                }

        render() {
            const activePlace = this.state.activePlace;
            return (                                                    ///jsx code in return
            <div className="App" onWheel={this.handleWheelScroll.bind(this)}>

                <header className='header' style={{background: this.state.color, transform: this.state.transform}}><h1>WeatherForecast</h1></header>
                <div className="currentWeather">
                <div className='weatherInfo'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>
                        Имя:
                        <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)} />
                    </label>
                        <input type="submit" value="Отправить" />
                </form>
                <WeatherDisplay
                key={activePlace}
                zip={PLACES[activePlace].zip}
                forecast={FRCST[this.state.current]}
                />
                <button onClick={this.handleDelete.bind(this)} className="deleteButton">Delete</button>
                </div>
                <div className='cityNav'>
                {PLACES.map((place, index) => (
                <button
                    key={index}
                    onClick={() => {
                    this.setState({ activePlace: index });
                    }}
                    className = "cityButton"
                >
                    {place.name}
                </button>
                ))}
                </div>
                </div>
                <div className="dailyForecast">
                <WeatherDisplay
                key={activePlace}
                zip={PLACES[activePlace].zip}
                forecast={FRCST[1]}
                />
                </div>
                <footer>
                </footer>
            </div>
            );
        }
    }

export default App;
