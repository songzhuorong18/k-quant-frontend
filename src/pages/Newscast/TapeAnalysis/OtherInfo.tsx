import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { Radio, Card, Table } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { get_etf, get_zdzs, get_lrye, get_cje } from '../../../services/Newscast';
import type { TableProps } from 'antd';

interface DataType {
    key: string;
    name: string;
    age: number;
}

const OtherInfo: React.FC = () => {
    const divRef = useRef(null);
    const myChart = useRef(null);

    const tabs = [
        {
            label: '市场风格',
            value: '1',
        },
        {
            label: '重点指数',
            value: '2',
        },
        {
            label: '两融余额',
            value: '3',
        },
        {
            label: 'ETF资金',
            value: '4',
        }
    ]


    const columns: TableProps<DataType>['columns'] = [
        {
            title: '股票名称',
            dataIndex: '股票名称',
        },
        {
            title: '昨日收盘价',
            dataIndex: '昨日收盘价',
        },
        {
            title: '月涨幅',
            dataIndex: '月涨幅',
        },
        {
            title: '周涨幅',
            dataIndex: '周涨幅',
        },
        {
            title: '日涨幅',
            dataIndex: '日涨幅',
        },
    ];

    const columnsETF: TableProps<DataType>['columns'] = [
        {
            title: '日期',
            dataIndex: '日期',
            width: 100,
        },
        {
            title: '股票型ETF净申购(亿份)',
            dataIndex: '股票型ETF净申购(亿份)',
        },
        {
            title: '沪市股票型ETF净申购(亿份)',
            dataIndex: '沪市股票型ETF净申购(亿份)',
        },
        {
            title: '深市股票型ETF净申购(亿份)',
            dataIndex: '深市股票型ETF净申购(亿份)',
        },
        {
            title: '净流入资金(亿元)',
            dataIndex: '净流入资金(亿元)',
        },
    ];

    function getOptions(xAxisData: string[], seriesData: any, yAxisConfig: any = {}) {
        return {
            grid: {
                bottom: 80,
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: xAxisData,
                axisLabel: {
                    rotate: 90, // 将标签旋转90度
                }
            },
            yAxis: {
                type: 'value',
                ...yAxisConfig,
            },
            series: seriesData,
        };
    }

    const [value, setValue] = useState('1');
    const [turnOverCH, setTurnOverCH] = useState('');


    async function getCJE() {
        const res = await get_cje();
        console.log("🚀 ~ getCJE ~ res:", res)
        const { turnOverCH, turnOver } = res.data[0];
        setTurnOverCH(turnOverCH);
        const xAxis = Object.keys(turnOver[Object.keys(turnOver)[0]])
        console.log("🚀 ~ getCJE ~ xAxis:", xAxis)
        const series = Object.keys(turnOver).map(key => {
            return {
                name: key,
                type: 'line',
                data: Object.values(turnOver[key])
            }
        })
        const myChart = echarts.init(divRef.current);
        myChart.setOption(getOptions(xAxis, series));
    }

    const [ZDZS, setZDZS] = useState([]);

    async function getZDZS() {
        const res = await get_zdzs();
        console.log("🚀 ~ getZDZS ~ res:", res)
        setZDZS(res.data[0].Ups_and_downs);
    }

    const lryeRef = useRef(null);

    async function getLRYE() {
        const res = await get_lrye();
        const { balance, balance_df } = res.data[0];
        setTurnOverCH(balance);
        const dfData = JSON.parse(balance_df);
        let xAxis: string[] = [];
        let seriesData: string[] = [];
        dfData.forEach((element: any) => {
            xAxis.push(element.date);
            seriesData.push(element.cn);
        });
        const series = [
            {
                type: 'line',
                data: seriesData
            }
        ]
        console.log('🚀 ~ getLRYE ~ dfData:', dfData);
        console.log("🚀 ~ getLRYE ~ res:", res);
        const myChart = echarts.init(lryeRef.current);
        myChart.setOption(getOptions(xAxis, series, {
            min: function (value: any) {
                console.log('🚀 ~ getLRYE ~ value:', value);
                return Math.floor(value.min) - 100;
            },
            // 其他yAxis配置，如axisLabel等
            axisLabel: {
                formatter: '{value}亿'  // 可选：格式化标签，显示金额单位
            }
        }));
    }

    const [ETF, setETF] = useState([]);
    async function getETF() {
        const res = await get_etf();
        setETF(res.data[0].etfData);
        console.log("🚀 ~ getETF ~ res:", res);
        setTurnOverCH(res.data[0].etf);
    }

    const onChange = (e: RadioChangeEvent) => {
        setTurnOverCH('');
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
        switch (e.target.value) {
            case '1':
                getCJE();
                break;
            case '2':
                getZDZS();
                break;
            case '3':
                getLRYE();
                break;
            case '4':
                getETF()
                break;
        }
    };

    useEffect(() => {
        getCJE();
    }, []);

    return <div style={{ width: '100%', background: '#f5f5f5', padding: '24px 0' }}>
        <Radio.Group options={tabs} optionType="button" style={{ padding: '0 24px' }} onChange={onChange} value={value} />
        {value === '1' && <div ref={divRef} style={{ height: '300px', width: '100%' }}></div>}
        {value === '3' && <div ref={lryeRef} style={{ height: '300px', width: '100%' }}></div>}
        {value === '2' && <Table style={{ padding: '0 24px', marginTop: '12px' }} columns={columns} dataSource={ZDZS} bordered pagination={false} />}
        {value === '4' && <Table style={{ padding: '0 24px', marginTop: '12px' }} columns={columnsETF} dataSource={ETF} bordered pagination={false} />}
        {turnOverCH && <Card style={{ margin: '12px 24px 0', paddingBottom: '20px ' }}>
            <div dangerouslySetInnerHTML={{ __html: turnOverCH }} ></div>
        </Card>}
    </div>

};

export default OtherInfo;
