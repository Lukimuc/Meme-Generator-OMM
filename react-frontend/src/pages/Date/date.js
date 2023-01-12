export class DateComponent extends Component {
    render() {
      const {day, month, year} = this.props;
      return (
        <div>{month}/{day}/{year}</div>
      );
    }
  }