import React, { Component } from 'react';
import * as Actions from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button, Grid, Glyphicon, Row, Col, Panel, FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import Incall from './incall';

class Dialer extends Component {

    constructor(props) {
        super(props);
        this.options = {
            media: {
                constraints: {
                    audio: true,
                    video: false
                }
            }
        };
        this.state = {
            phone: "demo2",
            incall: false
        }
    }

    handleQuickdial(e) {
        console.log(this.state.phone);
        this.uri = 'sip:' + this.state.phone + '@voice.chatchilla.com';
        this.state.phone.length > 0 ? this.props.apDial(this.uri, this.options, 'dial') : console.log("No Number to dial");
        this.setState({incall : true});
    }

    handleInputChange(e) {
        this.setState({ phone: e.target.value });
    }

    render() {
        return (
            <div>
                <Panel header="Dialer" bsStyle="success">
                    <Grid>
                        <Row>
                            <Col mdOffset={2} md={4}>
                                <FormGroup bsSize="large">
                                    <InputGroup>
                                        <FormControl value={this.state.phone} onChange={this.handleInputChange.bind(this)} placeholder="enter phone number" type="text" />
                                        <InputGroup.Button>
                                            <Button bsStyle="success" bsSize="large" onClick={this.handleQuickdial.bind(this)}> Quick Dial <Glyphicon glyph="phone" /></Button>
                                        </InputGroup.Button>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Grid>
                </Panel>
                {this.props.incall &&   <Incall phone={this.state.phone} /> }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    // console.log("Initial State: ",state);
    return { ...state };
};

const mapActionsToProps = (dispatch) => {
    console.log("Actions: ", Actions);
    return bindActionCreators(Actions, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(Dialer);
