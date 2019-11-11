import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            originLat: 53.580748,
            originLon: 10.0098,
            destLat: 53.551324,
            destLon: 9.986031,
            estimate: null
        };
    }

    handleChange(attribute, event) {
        let deltaObj = {};
        deltaObj[attribute] = event.target.value;
        this.setState(deltaObj);
    }

    handleGetEstimate(originLat, originLon, destLat, destLon) {
        let data = {
            "origin": {
                "lat": originLat,
                "lon": originLon
            },
            "destination": {
                "lat": destLat,
                "lon": destLon
            }
        };

        fetch("https://trip-estimate.api.trip.prd.moia-group.io/estimate", {
            //mode: "no-cors",
            method: "POST",
            headers: {
                "accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                return response.json();
            })
            .then(estimate => {
                this.setState({estimate: estimate});
            })
            .catch(err => {
                console.log(err);
            });
    }

    clearEstimate() {
        this.setState({estimate: null});
    }

    renderEstimate() {
        let currency = this.state.estimate.price.currency;
        return (
            <Card className="card">
                <h2 id="simple-modal-title">Trip</h2>
                <p id="simple-modal-description">
                    <div>Price {this.state.estimate.price.amountMin} - {this.state.estimate.price.amountMax} {currency}</div>
                    <div>ETA {this.state.estimate.etaMin} - {this.state.estimate.etaMax} Minutes</div>
                    <a href={this.state.estimate.deepLink}>Take me to MOIA</a>
                </p>
            </Card>
        );
    }

    render() {
        let isEstimate = this.state.estimate !== null;
        return (
            <div className="App">

                <CssBaseline />

                <Container maxWidth="sm">

                    <Card className="card">
                        <form noValidate autoComplete="off">
                            <div>
                                <TextField
                                    id="origin-lat"
                                    label="Origin Latitude"
                                    className="textField"
                                    margin="normal"
                                    type="number"
                                    value={this.state.originLat}
                                    onChange={event => this.handleChange("originLat", event)}
                                />
                                <TextField
                                    id="origin-lon"
                                    label="Origin Longitude"
                                    className="textField"
                                    margin="normal"
                                    type="number"
                                    value={this.state.originLon}
                                    onChange={event => this.handleChange("originLon", event)}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="dest-lat"
                                    label="Destination Latitude"
                                    className="textField"
                                    margin="normal"
                                    type="number"
                                    value={this.state.destLat}
                                    onChange={event => this.handleChange("destLat", event)}
                                />
                                <TextField
                                    id="dest-lon"
                                    label="Destination Longitude"
                                    className="textField"
                                    margin="normal"
                                    type="number"
                                    value={this.state.destLon}
                                    onChange={event => this.handleChange("destLon", event)}
                                />
                            </div>
                        </form>
                    </Card>

                    {!isEstimate &&
                        <Button variant="contained" color="primary" onClick={event => this.handleGetEstimate(this.state.originLat, this.state.originLon, this.state.destLat, this.state.destLon)}>
                            Get Estimate
                        </Button>
                    }

                    {isEstimate && this.renderEstimate()}

                </Container>
            </div>
        );
    }
}

export default App;
