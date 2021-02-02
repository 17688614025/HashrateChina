
// import request from '@/utils/request'
// import ajax from '@/utils/config'
import { get, post } from '@/utils/request_proxy'

// 登录
// export function getChainOverview(params){
//     return request({
//         url: 'http://192.168.31.128:8098/getChainOverview',
//         method: 'get',
//         params
//     })
// }

// export function getChainOverview (params) {
//     return new Promise((resove,reject) =>{
//       ajax.get('http://192.168.31.128:8098/getChainOverview',{
//         params
//       }).then(res =>{
//         resove(res.data)
//       }).catch(desc =>{
//         reject(desc.data)
//       })
//     })
// }

const page = { pageSize: 10, page: 0 }

// 富豪排行榜
export const richList = p => get('rich-list', { ...page, ...p })

// 最新区块
export const recentList = p => get('tipset/recent', { ...page, ...p })

// 区块列表
export const tipsetList = p => get('tipset/list', { ...page, ...p })

// 挖矿排行榜-有效算力排名
export const powerList = p => get('miner/top-miners/power', { continent: null, count: 20, ...page, ...p })

// 挖矿排行榜-算力增速排名
export const powerGrowthList = p => get('miner/top-miners/power-growth', { duration: '24h', ...page, ...p })

// 挖矿排行榜-出块数排名
export const blocksList = p => get('miner/top-miners/blocks', { duration: '24h', ...page, ...p })

// 挖矿排行榜-所有出块数排名
export const allBlocksList = p => get(`https://filscoutv3api.ipfsunion.cn/miner/list_order_by_blocks/miner_with_blocks_in_${p.duration}`, { ...p, page: p.page + 1, page_size: p.pageSize })
// export const allBlocksList = p => get('miner/list/blocks', { duration: '24h', ...page, ...p })

// 挖矿排行榜-所有有效算力排名
export const allPowerList = p => get('miner/list/power', { continent: null, ...page, ...p })

// 挖矿排行榜-所有算力增速排名
export const allPowerGrowthList = p => get('miner/list/power-growth', { duration: '24h', ...page, ...p })

// 挖矿收益变化
export const rewardPerByte = p => get('stats/miner/reward-per-byte', { duration: '24h', ...p })

// 矿工算力增量走势
export const powerGrowth = p => get('stats/miner/power-growth', { count: 7, duration: '7d', samples: 7, ...p })

// 扇区质押量变化
export const sectorInitialPledge = p => get('stats/miner/sector-initial-pledge', { duration: '24h', ...p })

// 24小时基础手续费
export const baseFee = p => get('stats/base-fee', { duration: '24h', samples: 48, ...p })

// 24h Gas 数据
export const messageFee = p => get('stats/message/fee', p)

// 订单列表
export const dealList = p => get('deal/list', { ...page, ...p })

// 内存池消息
export const messageMempoolList = p => get('message/mempool/list', { ...page, ...p })

// 消息列表
export const messageList = p => get('message/list', { ...page, ...p })

// 全网概览
export const powerBrief = p => get('miner/top-miners/power/brief', { count: 20, ...p })
// 内测-全网概览
// 环境的切换
var localApi = ''
if (process.env.NODE_ENV === 'development') {
  localApi = 'http://192.168.0.73:8098/'
} else if (process.env.NODE_ENV === 'production') {
  localApi = 'http://localhost:8098/'
}
export const get_calculate_info = p => post('https://explorer.atpool.com/api/calculator/get_calculate_info', p)
export const getFil = p => post('https://fgas.io/api/v1/getFil', p)
// export const getChainOverview = p => get('https://filscoutv3api.ipfsunion.cn/network/overview', p)
export const getChainOverview = p => get(localApi + 'getChainOverview', p)
// 地球节点
export const getEarthView = p => get('https://filscoutv3api.ipfsunion.cn/peer/map_all', { is_chinese: 1, ...p })
export const getMap = p => get(localApi + 'getMap', p)

// git 仓库 http://47.107.125.101:8889/Qiu_zhao_yun/HashrateChina/
// git 仓库 https://github.com/17688614025/HashrateChina
// 消息概览, 内存池消息详情
export const getMessage = p => get(`message/${p.id}`)

// 区块高度概览
export const getTipset = p => get(`tipset/${p.id}`)

// 矿工概览
export const getAddressDetail = p => get(`address/${p.id}`)

// 节点详情
export const getPeerDetail = p => get(`peer/${p.id}`)

// 区块详情
export const getBlockDetail = p => get(`block/${p.id}`)

// 区块消息列表
export const getBlockMessages = p => get(`block/${p.id}/messages`, { method: 'ProveCommitSector', ...page, ...p })

// 修改标签
export const addressTagCreateMessage = p => post(`address-tag/create/message`, { ...page, ...p })

// 新建标签
export const addressTagCreate = p => post(`address-tag/create`, { ...page, ...p })

// 矿工的消息列表
export const addressMessages = p => get(`address/${p.id}/messages`, { ...page, ...p })

// 矿工的区块列表
export const addressBlocks = p => get(`address/${p.id}/blocks`, { ...page, ...p })

// 矿工的转账列表
export const addressTransfers = p => get(`address/${p.id}/transfers`, { ...page, ...p })

// 矿工的挖矿统计
export const addressMiningStats = p => get(`address/${p.id}/mining-stats`, { duration: '7d', ...p })

// 矿工的账户变化
export const addressBalanceStats = p => get(`address/${p.id}/balance-stats`, p)

// 矿工的算力变化
export const addressPowerStats = p => get(`address/${p.id}/power-stats`)

/**
 * Body参数 (application/json)
 * @param {id}: 1
 * @param {jsonrpc}: "2.0"
 * @param {method}: "filscan.StatChainInfo"
 * @param {params}: []
 */
// 全网概览
export const socketApi = p => post('https://api.filscan.io:8700/rpc/v1', p)
