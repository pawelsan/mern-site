import React, { Component } from 'react';
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button
} from 'reactstrap';
import {
    CSSTransition,
    TransitionGroup
} from 'react-transition-group';
import uuid from 'uuid';
// connect is from getting the state from redux to react
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
// propTypes is a form of validation in React
import PropTypes from 'prop-types';

class ShoppingList extends Component {

    componentDidMount() {
        this.props.getItems();
    };

    render() {
        // props.item represents the state object from redux
        // items is our array from that state declared in the itemReducer
        const { items } = this.props.item;
        return (
            <Container>
                <Button
                    color="dark"
                    style={{ marginBottom: '2rem' }}
                    onClick={() => {
                        const name = prompt('Enter item');
                        if (name) {
                            this.setState(state => ({
                                items: [...state.items, { id: uuid(), name }]
                            }));
                        }
                    }}
                >
                    Add item
                </Button>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ id, name }) => (
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={() => {
                                            this.setState(state => ({
                                                items: state.items.filter(item => item.id !== id)
                                            }))
                                        }}
                                    >&times;</Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}
ShoppingList.propTypes = {
    // so we are passing here what is the state (from the store via connect) and what are the actions on the state (itemReducer)
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    // state.item comes from the root reducer
    // we are here mapping the redux state to a component property
    item: state.item
})

export default connect(
    mapStateToProps,
    { getItems }
)
    (ShoppingList);
