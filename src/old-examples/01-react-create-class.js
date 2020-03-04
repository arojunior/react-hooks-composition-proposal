/* eslint-disable */
var React = require('react');
var GetEvents = require('../services/GetEvents');

var Events = React.createClass({
  getInitialState: function() {
    return {
      list: [],
      name: null,
      isInputShown: false,
    };
  },
  handleClickBuyButton: function() {
    this.setState({
      isInputShown: !this.state.isInputShown,
    });
  },
  handleChangeNameInput: function(e) {
    this.setState({
      name: e.target.value,
    });
  },
  getList: function() {
    GetEvents.list().then(function(response) {
      this.setState({
        list: response.data.Events,
      });
    });
  },
  componentDidMount: function() {
    this.getList();
  },
  render: function() {
    var eventsList = this.state.list.map(function(evt, key) {
      return (
        <div className="col-md-3" key={key}>
          <div className="ibox">
            <div className="ibox-content product-box">
              <img
                className="img-responsive"
                src={'https://nomenalista.net/' + evt.eflyer}
              />
              <div className="product-desc">
                <small className="text-muted">{evt.date}</small>
                <a href="#" className="product-name">
                  {evt.name}
                </a>
                <div className="m-t text-righ">
                  <button
                    onClick={this.handleClickBuyButton}
                    className="btn btn-sm btn-primary"
                  >
                    Buy <i className="fa fa-long-arrow-right"></i>{' '}
                  </button>
                </div>
                {isInputShown ? (
                  <div className="m-t">
                    <input
                      type="text"
                      onChange={this.handleChangeNameInput}
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
  },
});

module.exports = Events;
