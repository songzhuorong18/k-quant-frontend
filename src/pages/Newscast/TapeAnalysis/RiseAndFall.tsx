import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { Card, Spin, Flex } from 'antd';
import { get_zdfb } from '../../../services/Newscast';

const RiseAndFall: React.FC = () => {
    const divRef = useRef(null);

    function getDefaultValues() {
        return [
            {
                label: '上涨',
                value: '',
                key: 'up',
                type: 'up',
            },
            {
                label: '下跌',
                value: '',
                key: 'down',
                type: 'down',
            },
            {
                label: '涨停',
                value: '',
                key: 'up_t',
                type: 'up',
            },
            {
                label: '跌停',
                value: '',
                key: 'down_t',
                type: 'down',
            },
        ];
    }
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<any[]>(getDefaultValues())



    function getOptions(xAxisData,seriesData) {
        return {
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
                data: xAxisData
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: seriesData,
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
    }

    async function getData() {
        setLoading(true)
        try {
            const res = await get_zdfb();
            console.log("🚀 ~ getData ~ res:", res.data[0])
            const resData = res.data[0]?.highs_and_lows || {};
            let options = getDefaultValues();
            options.forEach(item => item.value = resData[item.key])
            console.log("🚀 ~ getData ~ options:", options)
            setData(options);
            const xAxisData = Object.keys(resData.up_down);
            console.log("🚀 ~ getData ~ xAxisData:", xAxisData)
            const seriesData = Object.values(resData.up_down)
            console.log("🚀 ~ getData ~ seriesData:", seriesData)
            const myChart = echarts.init(divRef.current);
            myChart.setOption(getOptions(xAxisData,seriesData));
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
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
