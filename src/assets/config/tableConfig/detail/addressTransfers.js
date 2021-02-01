export default [
  {
    prop: 'timestamp',
    label: '时间',
    width: '100'
  },
  {
    prop: 'message',
    label: '消息ID',
    width: '',
    linkUrl: '/message/'
  },
  {
    prop: 'from',
    label: '发送方',
    width: '160',
    linkType: 'fromTag',
    linkUrl: '/richAddress/'
  },
  {
    prop: 'to',
    label: '接收方',
    width: '240',
    linkType: 'toTag',
    linkUrl: '/address/'
  },
  {
    prop: 'value',
    label: '净收入',
    width: '110'
  },
  {
    prop: 'type',
    label: '类型',
    width: ''
  }
]
