/**
 * Paginator for React.JS
 * 
 * @github https://github.com/code-artisan/ReactPaginator
 * @author artisan.
 * @Date(2015-11-16).
 */

import $ from 'jquery';
import React from 'react';
import _ from 'underscore';
import classnames from 'classnames';
import ReactPaginatorItem from './react-pagers-item.jsx';

class ReactPaginator extends React.Component {

  /**
   * Constructor
   * 
   * @param  {object} props Default props
   * @return {undefined}
   */
  constructor(props) {
    super(props);

    this.state = {
      active : props.active || 1,
      between: []
    };

    this.displayName = 'ReactPaginator';
  }

  /**
   * 修正 active 值，比如：<ReactPaginator active={-1} /> 则需要修正
   * 
   * @param  {number} active   当前页码
   * @return {number}          修正后的页码
   */
  active(active) {
    return Math.min(Math.max(active, 1), this.props.total);
  }

  /**
   * 根据 active 值填充页码
   * 
   * @param  {number} active 当前页码
   * @return {array}          填充好的页码数组
   */
  filler(active) {
    let {
          total,
          number
        } = this.props,

        // 显示页码总数的一半
        half = Math.floor(number / 2),

        // 计算开始页码
        min = active - half,

        // 计算结束页码
        max = active + half,

        // 存储生成的页码元素
        between = [];

        min = Math.max(min,     1);
        max = Math.min(max, total);
        
    if ( total - active < half ) {
      min = total - number;
    } else if ( active <= half ) {
      max = number + 1;
    }

    let unique = min;
    
    for (; unique <= max; unique++) {
      let option = {
        value : unique,
        unique: unique,
        active: active === unique // Is active.
      };
      between.push( option );
    }

    return between;
  }

  /**
   * 触发回调函数
   * 
   * @return {undefined}
   */
  handChange() {
    let { onChange } = this.props;

    if (_.isFunction(onChange)) {
      onChange(this.state.active);
    }
  }

  /**
   * 根据 active值 跳转到相应的页码并触发回掉函数
   * 
   * @param  {number} active 当前页码
   * @return {undefined}
   */
  handleRedirectTo(active, init) {
    active = this.active(active);

    if (active !== this.state.active || init) {
      let { between } = this.state;

      if ( this.props.visible ) {
        between = this.filler(active);
      }

      this.setState({
        active : active,
        between: between
      }, this.handChange);
    }
  }

  componentWillMount() {
    let { active } = this.props;
    this.handleRedirectTo(active, true);
  }

  componentWillReceiveProps(props) {
    this.handleRedirectTo(props.active, true);
  }

  render() {
    let { active, between } = this.state,
        {
          total, className,
          language, visible
        } = this.props;

    return (
      <div className={ classnames('react-paginator', 'react-paginator-default', className.container) }>
        <ul className={ this.props.visible ? 'pagination' : 'pager'}>
          { // 如果 page no 为 false，则不显示第一页 / 最后一页
            visible ? <ReactPaginatorItem value={ language.first } disabled={ active === 1 } className={ className.first } callback={ this.handleRedirectTo.bind(this, 1) } /> : null
          }
          <ReactPaginatorItem value={ language.prev } callback={ this.handleRedirectTo.bind(this, active - 1) } className={ className.prev } disabled={ active === 1 } />
          { // 是否需要生成页码
            visible ? between.map((option, key) => {
              return <ReactPaginatorItem key={ key } {...option} callback={ this.handleRedirectTo.bind(this) } />
            }) : null
          }
          <ReactPaginatorItem value={ language.next } callback={ this.handleRedirectTo.bind(this, active + 1) } className={ className.next } disabled={ active === total } />
          {
            visible ? <ReactPaginatorItem value={ language.last } disabled={ active === total } className={ className.last } callback={ this.handleRedirectTo.bind(this, total) } /> : null
          }
        </ul>
      </div>
    );
  }
}

ReactPaginator.defaultProps = {
  total: 20,
  active: 5,
  number: 8,
  visible: true,
  language: {
    last: "Last",
    prev: '«',
    next: '»',
    first: "First"
  },
  onChange: null,
  className: {
    prev: null,
    next: null,
    last: null,
    first: null,
    container: null
  }
};

ReactPaginator.propTypes = {
  total: React.PropTypes.number,
  active: React.PropTypes.number,
  number: React.PropTypes.number,
  visible: React.PropTypes.bool,
  language: React.PropTypes.object,
  onChange: React.PropTypes.func,
  className: React.PropTypes.object
};

export default ReactPaginator;
