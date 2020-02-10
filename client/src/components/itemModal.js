import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import uuid from 'uuid';
import PropTypes from 'prop-types';

class ItemModal extends Component {
    state = {
        modal: false,
        // when we have a form, we always want to have a piece of state in the component and not only on the application level
        name: ''
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = e => {
        this.setState({
            // e.target.name targets the name property in this form and any other potential new form
            [e.target.name]: e.target.value
        });
    }

    onSubmit = e => {
        e.preventDefault();
        const newItem = {
            id: uuid(),
            name: this.state.name
        }

        //  Add item via addItem action
        this.props.addItem(newItem);

        // Close modal
        this.toggle();
    }

    render() {
        return (
            <div>
                <Button
                    color="dark"
                    style={{ marginBottom: '2rem' }}
                    onClick={this.toggle}
                >Add Item</Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader
                        toggle={this.toggle}
                    >
                        Add to shopping list
                    </ModalHeader>
                    <ModalBody>
                        <Form
                            onSubmit={this.onSubmit}
                        >
                            <FormGroup>
                                <Label
                                    for='item'
                                >
                                    Item
                                </Label>
                                <Input
                                    type="text"
                                    // the name schuld much what is in the state
                                    name="name"
                                    id="item"
                                    placeholder="Add shopping item"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{ marginTop: '2rem' }}
                                    block
                                >
                                    Add Item
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
};

ItemModal.propTypes = {
    addItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    item: state.item
});

export default connect(
    mapStateToProps,
    { addItem }
)(ItemModal);