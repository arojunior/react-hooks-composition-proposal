/* eslint-disable */
import React, { useEffect, useState } from 'react';
import GetEventos from '../services/GetEventos';

const Eventos = () => {
  const [list, setList] = useState([]);
  const [name, setName] = useState(null);
  const [isInputShown, setIsInputShown] = useState(false);

  const handleChangeNameInput = () => e => {
    setName(e.target.value);
  };

  const handleClickBuyButton = () => () => {
    setIsInputShown(!isInputShown);
  };

  useEffect(() => {
    GetEventos.list().then(({ data }) => {
      setList(data.eventos);
    });
  });

  const eventosList = list.map((evt, key) => {
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
                  onClick={handleClickBuyButton}
                  className="btn btn-sm btn-primary"
                >
                  Buy <i className="fa fa-long-arrow-right"></i>{' '}
                </button>
              </div>
              {isInputShown ? (
                <div className="m-t">
                  <input
                    type="text"
                    onChange={handleChangeNameInput}
                    value={name}
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
      <div className="row">{eventosList}</div>
    </div>
  );
};

export default Eventos;
