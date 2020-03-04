import { compose, lifecycle, withHandlers, withState } from 'recompose';
import GetEvents from '../services/GetEvents';
import EventsComponent from './03-recompose-component';

const handleClickBuyButton = ({ setIsInputShown, isInputShown }) => () => {
  setIsInputShown(!isInputShown);
};

const handleChangeNameInput = ({ setName }) => e => {
  setName(e.target.value);
};

const getList = ({ setList }) => {
  GetEvents.list().then(({ data }) => {
    setList(data.eventos);
  });
};

export default compose(
  withState(`name`, `setName`, null),
  withState(`list`, `setList`, []),
  withState(`isInputShown`, `setIsInputShown`, false),
  withHandlers({
    handleClickBuyButton,
    handleChangeNameInput,
  }),
  lifecycle({
    componentDidMount() {
      const { setList } = this.props;
      getList({ setList });
    },
  })
)(EventsComponent);
