/* eslint-disable */
import React, { Component } from 'react';
import GetEvents from '../services/GetEvents';

class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      name: null,
      isInputShown: false,
    };

    this.getList = this.getList.bind(this);
    this.handleClickBuyButton = this.handleClickBuyButton.bind(this);
    this.handleChangeNameInput = this.handleChangeNameInput.bind(this);
  }

  handleClickBuyButton() {
    this.setState({
      isInputShown: !this.state.isInputShown,
    });
  }

  handleChangeNameInput(e) {
    this.setState({
      name: e.target.value,
    });
  }

  getList() {
    GetEvents.list().then(response => {
      this.setState({
        list: response.data.eventos,
      });
    });
  }

  componentDidMount() {
    this.getList();
  }

  render() {
    const eventsList = this.state.list.map((evt, key) => {
      return (
        <div className="col-md-3" key={key}>
          <div className="ibox">
            <div className="ibox-content product-box">
              <img
                className="img-responsive"
                src={'https://nomenalista.net/' + evt.eflyer}
              />
              <div className="product-desc">
                <small className="text-muted">{evt.data_inicio}</small>
                <a href="#" className="product-name">
                  {evt.nome}
                </a>
                <div className="m-t text-righ">
                  <button
                    onClick={() => this.handleClickBuyButton}
                    className="btn btn-sm btn-primary"
                  >
                    Buy <i className="fa fa-long-arrow-right"></i>{' '}
                  </button>
                </div>
                {isInputShown ? (
                  <div className="m-t">
                    <input
                      type="text"
                      onChange={() => this.handleChangeNameInput}
                      value={this.state.name}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="wrapper wrapper-content animated fadeInRight">
        <div className="row">{eventsList}</div>
      </div>
    );
  }
}

export default Events;
