import React, { useState, useEffect } from 'react';
import { Flex, Table, Spin } from 'antd';
import type { TableProps } from 'antd';
import { queryStocks } from '../../services/Newscast';

interface DataType {
    key: string;
    name: string;
    age: number;
}


const PopularStocks: React.FC = () => {

    const columns: TableProps<DataType>['columns'] = [
        {
            title: '连板数',
            dataIndex: '连板数',
            width: 100,
        },
        {
            title: '晋级率',
            dataIndex: '晋级率',
        },
        {
            title: '连板股分布图',
            dataIndex: '连板股分布图',
        },
    ];

    const [data, setData] = useState([]);
    const [analysis, setAnalysis] = useState('');

    const [loading, setLoading] = useState(false)

    async function getStocks() {
        setLoading(true)
        try {
            const res = await queryStocks();
            setData(res.data[0].table);
            setAnalysis(res.data[0].analysis);
        } catch (error) {

        } finally {
            setLoading(false)
        }

    }
    useEffect(() => {
        getStocks()
    }, [])

    return <Spin spinning={loading}>
        <Flex justify="space-between" align="stretch" gap={12}>
            <div style={{ width: '100%', background: '#f5f5f5', padding: '24px' }}>
                <div style={{ fontSize: '16px', fontWeight: 500, paddingBottom: '12px' }}>客观</div>
                <Table columns={columns} dataSource={data} bordered pagination={false} />
            </div>
            <div style={{ width: '100%', background: '#f5f5f5', padding: '24px' }} >
                <div style={{ fontSize: '16px', fontWeight: 500, paddingBottom: '12px' }}>主观</div>
                <div dangerouslySetInnerHTML={{ __html: analysis }} ></div>
            </div>
        </Flex>
    </Spin>


};

export default PopularStocks;
