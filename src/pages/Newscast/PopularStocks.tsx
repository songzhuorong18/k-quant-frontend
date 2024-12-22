import React, { useRef, useEffect } from 'react';
import { Flex, Table } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
    key: string;
    name: string;
    age: number;
}

const PopularStocks: React.FC = () => {
    const sharedOnCell = (_: DataType, index?: number) => {
        if (index === 0) {
            return { colSpan: 0 };
        }

        return {};
    };

    const columns: TableProps<DataType>['columns'] = [
        {
            title: '连板数',
            dataIndex: 'key',
            rowScope: 'row',
            onCell: sharedOnCell,
        },
        {
            title: '晋级率',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
            onCell: (_, index) => ({
                colSpan: index === 0 ? 3 : 1,
            }),
        },
        {
            title: '分布图',
            dataIndex: 'age',
            onCell: sharedOnCell,
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,

        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
        },
        {
            key: '4',
            name: 'Jim Red',
            age: 18,
        },
        {
            key: '5',
            name: 'Jake White',
            age: 18,

        },
    ];
    return <Flex justify="space-between" align="stretch" gap={12}>
        <div style={{ width: '100%', background: '#f5f5f5', padding: '24px' }}>
            <div style={{ fontSize: '16px', fontWeight: 500, paddingBottom: '12px' }}>客观</div>
            <Table<DataType> columns={columns} dataSource={data} bordered pagination={false} />
        </div>
        <div style={{ width: '100%', background: '#f5f5f5', padding: '24px' }} >
            <div style={{ fontSize: '16px', fontWeight: 500, paddingBottom: '12px' }}>主观</div>
            11月22日，共74股涨停，连板股总数37只，其中三连板及以上个股25只，上一交易日共45只连板股，连板股晋级率55.56%（不含ST股、退市股）。
            个股方面，全市场超4900只个股下跌，近70股跌逾996，高位股分歧加剧，午后海宁皮城、鼎龙科技、日出东方等连板股炸板，海能达、川发龙蟒等前热跌停，大千生态止步13连板，甚至粤桂股份也一度打开涨停。板块方面，受商务部大力发展跨境电商赋能产业带消息刺激，早盘电商板块大幅拉升，广博股份6天4板、南极电商3连板，并带动其余AI应用端分支走强，魅视科技4连板，二六三6天4板，三六零一度涨停。总体来看，当前市场小盘股依旧占优，大盘股表现赢弱，与上证指数强相关的证券板块，与创业板指数强相关的光伏板块跌福居前。
        </div>
    </Flex>

};

export default PopularStocks;
