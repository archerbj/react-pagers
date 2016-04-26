import React from 'react';
import _ from 'underscore';

class ReactPagersJumper extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      inputValue: props.value
    };
  }

  handleInputPageNumber({target, keyCode}) {
    let value = parseInt(target.value, 10),
        { onChange } = this.props,
        previsous = this.state.value;

    if (keyCode === 13 && previsous !== value) {
      if (_.isFunction(onChange)) {
        onChange( value );
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.state.inputValue = nextProps.value;
  }

  render() {
    return (
      <li>
        <span className="pagers-jumper">
          到第
          <input key={ this.props.value }
            className="form-control"
            type="text" defaultValue={ this.props.value }
            onKeyUp={ this.handleInputPageNumber.bind(this) } />
          页
        </span>
      </li>
    );
  }
}

ReactPagersJumper.defaultProps = {
  value: null,
  onChange: null
};

ReactPagersJumper.propTypes = {
  value: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default ReactPagersJumper;
