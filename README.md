# react-pagers
Paginator for React.JS

## 安装
```bash
$ npm install react-pagers --save
```

## 使用
```js
import ReactPagers from 'ReactPagers';

<ReactPagers {...props} />
```

## API

| 名称 | 类型 | 默认值 | 描述 |
| ---- | ---- | ---- | --- |
| `total` | number | 20 | 一共有多少页 |
| `active` | number | 1 | 当前页面 |
| `number` | number | 8 | 显示多少个页码 |
| `visiable` | boolean | true | 页码是否可见 |
| `language` | object | ` language: { last: 'Last', prev: '«', next: '»', first: 'First' }` | 本地化 |
| `onChange` | function | null | 改变页码时的回调函数 |
| `className` | object | `className: { prev: null, next: null, last: null, first: null, container: null }` | 样式自定义 |

## 更新日志
- v1.0.1
  + 逻辑错误

- v1.0.0
  + 基本功能
  + 本地化
  + 自定义样式

## License
MIT
