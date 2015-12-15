/**
 * Paginator for React.JS
 * 
 * @github https://github.com/code-artisan/ReactPagers
 * @author artisan.
 * @Date(2015-11-16).
 */

import $ from 'jquery';
import React from 'react';
import _ from 'underscore';
import classnames from 'classnames';
import ReactPagersItem from './react-pagers-item.jsx';

class ReactPagers extends React.Component {

  /**
   * Constructor
   * 
   * @param  {object} props Default props
   * @return {undefined}
   */
  constructor(props) {
    super(props);

    this.state = {
      useHash: !!props.useHash,
      active : props.active || 1,
      between: []
    };

    this.matcher = /page\=([0-9]+)/;

    this.displayName = 'ReactPagers';
  }

  /**
   * 修正 active 值，比如：<ReactPagers active={-1} /> 则需要修正
   * 
   * @param  {number} active   当前页码
   * @return {number}          修正后的页码
   */
  active(active) {
    var total = Math.max(1, this.props.total);
    return Math.min(Math.max(active, 1), total);
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

        max = Math.max(max, number);

    total = Math.max(1, total); // 修正总页码数，有可能传入0或负数
    max   = Math.min(max, total);
    min   = Math.max(max - number + 1, 1);

    for (; min <= max; min++) {
      let option = {
        value : min,
        unique: min,
        active: active === min // Is active.
      };
      between.push( option );
    }

    return between;
  }

  /**
   * 触发回调函数.
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
   * 获取hash中的页码.
   * 
   * @return {Number}
   */
  getHashPage() {
    let hash = location.hash,
        result = hash.match(this.matcher);
    return $.isArray(result) ? +result[1] : 0;
  }

  /**
   * 根据 active值 跳转到相应的页码并触发回掉函数
   * 
   * @param  {number} active 当前页码
   * @return {undefined}
   */
  handleRedirectTo(active, init) {
    if (this.state.useHash) {
      active = this.getHashPage(); 
    }

    this.state.useHash = false;
    active = this.active(active);

    if (active !== this.state.active || init) {
      let { between } = this.state;

      if ( this.props.visible ) {
        between = this.filler(active);
      }

      let handChange = init ? null : this.handChange;

      this.setState({
        active : active,
        between: between
      }, handChange);
    }
  }

  /**
   * Set location hash.
   * 
   * @param {Number} active active page.
   */
  setQueryString(active) {
    var hash = location.hash,
        result = hash.match(this.matcher);

    if (_.isArray(result)) {
      hash = hash.replace(this.matcher, ($0, $1) => {
        return `page=${active}`;
      });
    } else {
      hash += `/page=${active}`;
    }

    location.hash = hash;
  }

  componentWillMount() {
    this.handleRedirectTo(this.props.active, true);
  }

  componentDidUpdate() {
    if (this.props.useHash) {
      this.setQueryString(this.state.active);
    }
  }

  componentWillReceiveProps(props) {
    this.props = props;
    this.state.useHash = !!props.useHash;
    this.handleRedirectTo(this.props.active, true);
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
            visible ? <ReactPagersItem value={ language.first } disabled={ active === 1 } className={ className.first } callback={ this.handleRedirectTo.bind(this, 1) } /> : null
          }
          <ReactPagersItem value={ language.prev } callback={ this.handleRedirectTo.bind(this, active - 1) } className={ className.prev } disabled={ active === 1 } />
          { // 是否需要生成页码
            visible ? between.map((option, key) => {
              return <ReactPagersItem key={ key } {...option} callback={ this.handleRedirectTo.bind(this) } />
            }) : null
          }
          <ReactPagersItem value={ language.next } callback={ this.handleRedirectTo.bind(this, active + 1) } className={ className.next } disabled={ active === total } />
          {
            visible ? <ReactPagersItem value={ language.last } disabled={ active === total } className={ className.last } callback={ this.handleRedirectTo.bind(this, total) } /> : null
          }
        </ul>
      </div>
    );
  }
}

ReactPagers.defaultProps = {
  total: 1,
  active: 1,
  number: 9,
  useHash: true,
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

ReactPagers.propTypes = {
  total: React.PropTypes.number,
  active: React.PropTypes.number,
  number: React.PropTypes.number,
  useHash: React.PropTypes.bool,
  visible: React.PropTypes.bool,
  language: React.PropTypes.object,
  onChange: React.PropTypes.func,
  className: React.PropTypes.object
};

export default ReactPagers;
