import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { Card, Spin, Flex } from 'antd';

const RiseAndFall: React.FC = () => {
    const divRef = useRef(null);

    function getDefaultValues() {
        return [
            {
                label: '上涨',
                value: '122',
                key: '1',
                type: 'up',
            },
            {
                label: '下跌',
                value: '324',
                key: '2',
                type: 'down',
            },
            {
                label: '涨停',
                value: '32424',
                key: '3',
                type: 'up',
            },
            {
                label: '跌停',
                value: '2324',
                key: '4',
                type: 'down',
            },
        ];
    }
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<any[]>(getDefaultValues())

    const option = {
        title: {
            text: '涨跌分布',
            left: 20,
            top: 12,
            textStyle: {
                fontSize: 14
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [
                    120,
                    150,
                    80,
                    70,
                    110,
                    130,
                    10
                ],
                type: 'bar',
                itemStyle: {
                    // 定义一个函数来根据横坐标的索引返回不同的颜色
                    color: function (params: any) {
                        // 这里可以根据需要设置不同的颜色
                        const colors = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622'];
                        return colors[params.dataIndex % colors.length];
                    }
                }
            }
        ]
    };

    useEffect(() => {
        const myChart = echarts.init(divRef.current);
        myChart.setOption(option);
    }, []);

    return <div style={{ width: '100%', background: '#f5f5f5', padding: '24px 0' }}>
        <div style={{ padding: '0 24px', fontSize: '16px', fontWeight: 500 }}>涨跌情况</div>
        <div ref={divRef} style={{ height: '300px', width: '100%' }}></div>
        <div style={{ padding: '0 24px 12px' }}>涨跌趋势</div>
        <Card style={{ margin: '0 24px', paddingBottom: '20px ' }}>
            <Flex justify="space-between" align="center">
                {
                    (data || []).map(item =>
                        <Flex vertical justify="center" align="center" key={item.key}>
                            {item.label}
                            <Spin spinning={loading}>
                                <div style={{ fontSize: '20px', lineHeight: '24px', fontWeight: 600, color: `${item.type === 'up' ? '#fe2637' : '#01a047'}` }}>{item.value}</div>
                            </Spin>

                        </Flex>
                    )
                }
            </Flex>

        </Card>
    </div>

};

export default RiseAndFall;
