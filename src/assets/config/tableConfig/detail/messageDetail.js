export default [
  {
    prop: 'cid',
    label: '消息ID',
    width: ''
  },
  {
    prop: 'height',
    label: '高度',
    width: '',
    linkUrl: '/block/'
  },
  {
    prop: 'timestamp',
    label: '时间',
    width: ''
  },
  {
    prop: 'blocks',
    label: '所属区块',
    width: '',
    linkUrl: '/block/',
    type: 'Array'
  },
  {
    prop: 'from',
    label: '发送方',
    width: '',
    linkUrl: '/richAddress/'
  },
  {
    prop: 'to',
    label: '接收方',
    width: '',
    linkUrl: '/address/',
    tag: 'toTag'
  },
  {
    prop: 'method',
    label: '方法',
    width: ''
  },
  {
    prop: 'value',
    label: '金额',
    width: ''
  },
  {
    prop: 'exitCode',
    label: '状态',
    width: '100'
  }
]
