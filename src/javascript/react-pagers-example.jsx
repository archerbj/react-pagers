import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactPaginator from './react-pagers.jsx';

class ReactPaginatorExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };

    this.displayName = 'ReactPaginatorExample';
  }

  handlePaginatorChange(active) {
    console.log('当前页码：%s', active);
  }

  render() {
    return (
      <div className="paginator-example-container container">
        

        <div className="paginator-example">
          <h3>中文</h3>
          <ReactPaginator active={1} total={30} language={{
            last: "末页",
            prev: '上一页',
            next: '下一页',
            first: "首页"
          }} onChange={ this.handlePaginatorChange.bind(this) } />
        </div>

        
      </div>
    );
  }
}

ReactDOM.render(<ReactPaginatorExample />, document.getElementById('paginator-example'));
