/**
 * Link for ReactPaginator
 * @author artisan.
 * @Date(2015-11-16).
 */

import React from 'react';
import _ from 'underscore';
import classnames from 'classnames';

class ReactPaginatorItem extends React.Component {
  constructor(props) {
    super(props);

    this.displayName = 'ReactPaginatorItem';
  }

  handleClick() {
    // Diabled or active.
    if ( this.props.disable || this.props.active ) return ;

    let { callback, unique } = this.props;

    if (_.isFunction(callback)) {
      callback( unique || 0 );
    }
  }

  render() {
    return (
      <li className={classnames(this.props.className, {
        'active'  : this.props.active,
        'disabled': this.props.disabled
      })} onClick={ this.handleClick.bind(this) }>
        <a href="javascript:;">{ this.props.value }</a>
      </li>
    );
  }
}

ReactPaginatorItem.defaultProps = {
  value : null,
  active: false,
  unique: null,
  disabled: false,
  callback: null,
  className: null
};

ReactPaginatorItem.propTypes = {
  value : React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  active: React.PropTypes.bool,
  unique: React.PropTypes.number,
  disabled: React.PropTypes.bool,
  callback: React.PropTypes.func,
  className: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object
  ])
};

export default ReactPaginatorItem;
