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
| `total` | number | 1 | 一共有多少页 |
| `active` | number | 1 | 当前页面 |
| `number` | number | 9 | 显示多少个页码 |
| `useHash` | boolean | true | 是否启用hash |
| `visiable` | boolean | true | 页码是否可见 |
| `language` | object | ` language: { last: 'Last', prev: '«', next: '»', first: 'First' }` | 本地化 |
| `onChange` | function | null | 改变页码时的回调函数 |
| `className` | object | `className: { prev: null, next: null, last: null, first: null, container: null }` | 样式自定义 |
| `jumper` | boolean | false | 是否显示跳转输入框 |

> 如果开启了useHash，每次的翻页都会在hash中记载，如需实现页面内容根据hash中page字段，需手动获取page字段并传入，如：

```js
var matcher = /page\=([0-9]+)/,
    result  = location.hash.match(matcher),
    active  = 1;

if ($.isArray(result)) {
  active = +result.pop();
}

// ...
```

## 更新日志
- v2.0.0
  + 新增功能：`jumper` 是否显示跳转输入框

- v1.0.2
  + 新增功能：useHash


- v1.0.1
  + 逻辑错误


- v1.0.0
  + 基本功能
  + 本地化
  + 自定义样式

## License
MIT
