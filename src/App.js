import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            date: '',
            time: '',
            partySize: '',
            message: ''
        };

        this.availableTimes = [
            '11:00',
            '11:30',
            '12:00',
            '12:30',
            '13:00',
            '13:30',
            '14:00',
            '14:30',
            '15:00',
            '15:30',
            '16:00',
            '16:30',
            '17:00',
            '17:30',
            '18:00',
            '18:30',
            '19:00',
            '19:30',
            '20:00',
            '20:30',
            '21:00',
            '21:30'
        ];
    }

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    getDateMessage = () => {
        const selectedDate = this.state.date;
        const selectedDay = new Date(selectedDate).getDay(); // 0 = Sonntag, 1 = Montag, usw.

        if (selectedDay === 4) { // 4 steht für Donnerstag
            return 'Wir haben am Donnerstag geschlossen';
        }

        return '';
    }

    getTimeMessage = () => {
        const selectedTime = this.state.time;

        const lunchStartTime = '11:00';
        const lunchEndTime = '12:00';
        const ungultigStartTime = '12:01';
        const ungultigEndTime = '12:59';
        const mittagStartTime = '13:00';
        const mittagEndTime = '15:00';
        const zviriStartTime = '15:01';
        const zviriEndTime = '17:59';
        const dinnerStartTime = '18:00';
        const dinnerEndTime = '22:00';

        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!timeRegex.test(selectedTime)) {
            return 'Ungültige Uhrzeit';
        }

        if (selectedTime >= ungultigStartTime && selectedTime <= ungultigEndTime) {
            return 'Mittagessen';
        } else if (selectedTime >= lunchStartTime && selectedTime <= lunchEndTime) {
            return 'Mittagessen';
        } else if (selectedTime >= zviriStartTime && selectedTime <= zviriEndTime) {
            return 'Nachmittagssnack';
        } else if (selectedTime >= dinnerStartTime && selectedTime <= dinnerEndTime) {
            return 'Abendessen';
        } else if (selectedTime >= mittagStartTime && selectedTime <= mittagEndTime) {
            return 'Mittagessen';
        } else {
            return 'Wir haben zur dieser Uhrzeit leider geschlossen';
        }
    }

    handleSubmit = event => {
        const selectedTime = this.state.time;
        const selectedDate = this.state.date;
        const selectedDay = new Date(selectedDate).getDay();
        const lunchStartTime = '11:00';
        const lunchEndTime = '12:00';
        const ungultigStartTime = '12:01';
        const ungultigEndTime = '12:59';
        const zviriStartTime = '15:01';
        const zviriEndTime = '17:59';
        const dinnerStartTime = '18:00';
        const dinnerEndTime = '22:00';

        if (selectedDay === 4) {
            alert('Wir haben am Donnerstag geschlossen');
            event.preventDefault();
            return;
        }
        if (
            (selectedTime < ungultigStartTime || selectedTime > ungultigEndTime)
        ) {
            alert('Mittagessen');
            event.preventDefault();
            return;
        } else if (
            (selectedTime < lunchStartTime || selectedTime > lunchEndTime) &&
            (selectedTime < dinnerStartTime || selectedTime > dinnerEndTime) &&
            (selectedTime < zviriStartTime || selectedTime > zviriEndTime)
        ) {
            alert('Wir haben zur dieser Uhrzeit geschlossen');
            event.preventDefault();
            return;
        }
        alert(`Deine Reservation wurde abgeschickt`);
        this.setState({
            name: '',
            email: '',
            phone: '',
            date: '',
            time: '',
            partySize: '',
            message: ''
        });
        event.preventDefault();
    }
    render() {
        return (
            <div className="formular">
                <div className="form-container">
                    <div className="container">
                        <form onSubmit={this.handleSubmit}>
                            <header>
                              <br/>
                                <br/>
                                <br/>
                                <br/>
                            </header>
                            <Container>
                                <Row>
                                    <Col sm={6}>
                                        <br/>
                                        <h2>Tischreservation</h2>
                                        <br/>
                                        <div className="form-group">
                                            <label htmlFor="date">Datum:</label>
                                            <input type="date" name="date" id="date" value={this.state.date} onChange={this.handleInputChange} className="form-control" required
                                                   title="Bitte gib ein gültiges Datum ein"
                                                   onInvalid={(e) => e.target.setCustomValidity("Bitte gib ein gültiges Datum ein")}
                                                   onInput={(e) => e.target.setCustomValidity('')}/>

                                            <p>{this.getDateMessage()}</p>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="time">Uhrzeit:</label>
                                            <select
                                                name="time"
                                                id="time"
                                                value={this.state.time}
                                                onChange={this.handleInputChange}
                                                className="form-control custom-select"
                                                required
                                                title="Bitte wähle eine Uhrzeit aus ein"
                                                onInvalid={(e) => e.target.setCustomValidity("Bitte wähle eine Uhrzeit aus ein")}
                                                onInput={(e) => e.target.setCustomValidity('')}>
                                                <option value="">Wähle deine Uhrzeit aus</option>
                                                {this.availableTimes.map((time, index) => (
                                                    <option key={index} value={time}>
                                                        {time}
                                                    </option>
                                                ))}
                                            </select>
                                            <p>{this.getTimeMessage()}</p>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="partySize">Gruppengröße:</label>
                                            <input
                                                type="number"
                                                name="partySize"
                                                id="partySize"
                                                value={this.state.partySize}
                                                onChange={this.handleInputChange}
                                                className="form-control"
                                                required
                                                min="1"
                                                title="Bitte gib eine positive Zahl ein."
                                                onInvalid={(e) => e.target.setCustomValidity("Bitte gib eine positive Zahl ein.")}
                                                onInput={(e) => e.target.setCustomValidity('')}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="message">Sonstiges:</label>
                                            <textarea name="message" id="message" value={this.state.message} onChange={this.handleInputChange} className="form-control" />
                                        </div>
                                    </Col>
                                    <Col sm={6}>
                                        <br/>
                                        <h2>Persönliche Informationen</h2>
                                        <br/>
                                        <div className="form-group">
                                            <label htmlFor="name">Name:</label>
                                            <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleInputChange} className="form-control" required
                                                   title="Bitte wähle eine Uhrzeit aus ein"
                                                   onInvalid={(e) => e.target.setCustomValidity("Bitte gib hier deinen Namen ein")}
                                                   onInput={(e) => e.target.setCustomValidity('')}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email:</label>
                                            <input type="email" name="email" id="email" value={this.state.email} onChange={this.handleInputChange} className="form-control" required
                                                   title="Bitte wähle eine Uhrzeit aus ein"
                                                   onInvalid={(e) => e.target.setCustomValidity("Bitte gib hier deine Email ein")}
                                                   onInput={(e) => e.target.setCustomValidity('')}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone">Telefon:</label>
                                            <input type="tel" name="phone" id="phone" value={this.state.phone} onChange={this.handleInputChange} className="form-control" required
                                                   title="Bitte wähle eine Uhrzeit aus ein"
                                                   onInvalid={(e) => e.target.setCustomValidity("Bitte gib hier deine Telefonnummer ein")}
                                                   onInput={(e) => e.target.setCustomValidity('')}/>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                            <Container>
                                <Row>
                                    <Col sm={7}>
                                        <br />
                                        <button type="submit" className={"schicken"}>Tisch reservieren</button>
                                        <br/>
                                        <br/>
                                    </Col>
                                    <Col sm={2}>
                                    </Col>
                                    <Col sm={2} >
                                    </Col>
                                </Row>
                            </Container>
                        </form>
                    </div>
                </div>
                <footer>
                    <br />
                    <br />
                    <br />
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </footer>
            </div>
        );
    }
}

export default App;
