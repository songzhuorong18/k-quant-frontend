import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import { Radio, Card } from 'antd';

const OtherInfo: React.FC = () => {
    const divRef = useRef(null);

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
    const option = {
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
                name: 'Email',
                type: 'line',
                stack: 'Total',
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: 'Union Ads',
                type: 'line',
                stack: 'Total',
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: 'Video Ads',
                type: 'line',
                stack: 'Total',
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: 'Direct',
                type: 'line',
                stack: 'Total',
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: 'Search Engine',
                type: 'line',
                stack: 'Total',
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };

    useEffect(() => {
        const myChart = echarts.init(divRef.current);
        myChart.setOption(option);
    }, []);

    return <div style={{ width: '100%', background: '#f5f5f5', padding: '24px 0' }}>
        <Radio.Group options={tabs} optionType="button" style={{ padding: '0 24px' }} />
        <div ref={divRef} style={{ height: '300px', width: '100%' }}></div>
        <Card style={{ margin: '0 24px', paddingBottom: '20px ' }}>
            <div>成交古比来看，大盘股占优。沪深300、中证500、中证2000与科创50成交占比均下降，中证2000成大百比有開上升。</div>
        </Card>
    </div>

};

export default OtherInfo;
