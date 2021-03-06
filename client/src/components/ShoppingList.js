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

// connect is from getting the state from redux to react
import { connect } from 'react-redux';
// We are bringing in the actions
import { getItems, deleteItem } from '../actions/itemActions';
// propTypes is a form of validation in React
import PropTypes from 'prop-types';

class ShoppingList extends Component {

    componentDidMount() {
        this.props.getItems();
    };

    onDeleteClick = id => {
        this.props.deleteItem(id);
    };

    render() {
        // props.item represents the state object from redux
        // items is our array from that state declared in the itemReducer
        const { items } = this.props.item;
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ id, name }) => (
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeleteClick.bind(this, id)}
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

const mapStateToProps = state => ({
    // state.item comes from the root reducer
    // we are here mapping the redux state to a component property
    item: state.item
})

export default connect(
    mapStateToProps,
    // any action we import, we need to put here as well
    // they are accessible through this.props.deleteItem etc
    { getItems, deleteItem }
)
    (ShoppingList);
