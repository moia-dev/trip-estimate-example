import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            origin: null,
            dest: null,
            estimate: null,
            zoom: 13,
        };
    }

    handleChange(attribute, event) {
        let deltaObj = {};
        deltaObj[attribute] = event.target.value;
        this.setState(deltaObj);
    }

    handlePositionSelection(latLng) {
        let position = {
            lat: parseFloat(latLng[0].toFixed(6)),
            lon: parseFloat(latLng[1].toFixed(6))
        };

        if (this.state.origin === null) {
            this.setState({origin: position})
        } else if(this.state.dest === null) {
            this.setState({dest: position})
        }
    }

    handleGetEstimate(origin, dest) {
        let data = {
            "origin": {
                "lat": origin.lat,
                "lon": origin.lon
            },
            "destination": {
                "lat": dest.lat,
                "lon": dest.lon
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
        this.setState({estimate: null, origin: null, dest: null});
    }

    renderEstimate() {
        let currency = this.state.estimate.price.currency;
        return (
            <Card className="card">
                <h2 id="simple-modal-title">Trip</h2>
                <div id="simple-modal-description">
                    <div>Price: {this.state.estimate.price.amountMin} - {this.state.estimate.price.amountMax} {currency}</div>
                    <div>ETA: {this.state.estimate.etaMin} - {this.state.estimate.etaMax} Minutes</div>
                    <a href={this.state.estimate.deepLink}>Take me to MOIA</a>
                </div>
            </Card>
        );
    }

    renderMap() {
        const origin = this.state.origin && [this.state.origin.lat, this.state.origin.lon];
        const destination = this.state.dest && [this.state.dest.lat, this.state.dest.lon];
        const center = [53.567137,9.9948631];
        return (
            <Map center={center} zoom={12.67} height={400} onClick={(event) => this.handlePositionSelection(event.latLng)} >
                {origin && <Marker anchor={origin} />}
                {destination && <Marker anchor={destination} />}
            </Map>
        )
    }

    render() {
        let isEstimate = this.state.estimate !== null;
        return (
            <div className="App">
                <CssBaseline />

                <Container maxWidth="sm">

                    <Card className="card">
                        {this.renderMap()}
                        <form noValidate autoComplete="off">
                            <div>
                                <TextField
                                    id="origin-lat"
                                    label="Origin Latitude"
                                    className="textField"
                                    margin="normal"
                                    type="number"
                                    value={(this.state.origin && this.state.origin.lat) || ""}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    id="origin-lon"
                                    label="Origin Longitude"
                                    className="textField"
                                    margin="normal"
                                    type="number"
                                    value={(this.state.origin && this.state.origin.lon) || ""}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="dest-lat"
                                    label="Destination Latitude"
                                    className="textField"
                                    margin="normal"
                                    type="number"
                                    value={(this.state.dest && this.state.dest.lat) || ""}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    id="dest-lon"
                                    label="Destination Longitude"
                                    className="textField"
                                    margin="normal"
                                    type="number"
                                    value={(this.state.dest && this.state.dest.lon) || ""}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </div>
                        </form>
                    </Card>

                    {!isEstimate &&
                        <Button variant="contained" color="primary" onClick={event => this.handleGetEstimate(this.state.origin, this.state.dest)}>
                            Get Estimate
                        </Button>
                    }

                    {isEstimate && this.renderEstimate()}
                    {isEstimate &&
                        <Button variant="contained" color="primary" onClick={event => this.clearEstimate()}>
                            Reset
                        </Button>
                    }

                </Container>
            </div>
        );
    }
}

export default App;
