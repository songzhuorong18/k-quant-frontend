import React from 'react';
import moment from 'moment';
import { Flex, Button, Card } from 'antd';
import BasicLayout from '../../layout/BasicLayout';
import './index.less';
import HotNews from './HotNews';
import RiseAndFall from './TapeAnalysis/RiseAndFall';
import OtherInfo from './TapeAnalysis/OtherInfo';
import PopularStocks from './PopularStocks';
import AShares from './AShares';

const News: React.FC = () => {

  function getGreeting() {
    const currentHour = moment().hour();

    if (currentHour < 12) {
      return '上午好';
    } else if (currentHour < 18) {
      return '下午好';
    } else {
      return '晚上好';
    }
  }
  
  return (
    <BasicLayout backgroundColor="#f5f5f5">
      <div>
        <Flex justify="space-between" align="center" className='news-header'>
          <div>
            <span className='greet'>{getGreeting()}</span>
            <span className='date'>{moment().format('YYYY/MM/DD')} </span>
          </div>
          <span className='title'>今日新闻播报</span>
          <Button type="primary">导出金融日报</Button>
        </Flex>
      </div>
      <Card
        className='card-title'
        title={<div>热点追击<span className='card-desc'>为您提供自动化的每日重要新闻筛选</span></div>}
      >
        <HotNews />
      </Card>
      <Card
        className='card-title'
        title={<div>大盘分析<span className='card-desc'>把握市场整体脉络</span></div>}
      >
        <Flex justify="space-between" align="stretch" gap={12} >
          <RiseAndFall />
          <OtherInfo />
        </Flex>

      </Card>
      <Card
        className='card-title'
        title={<div>热门股票及板块分析<span className='card-desc'>跟踪热门股票和资金流动</span></div>}
      >
        <PopularStocks />
      </Card>
      <Card
        className='card-title'
        title={<div>A股小结<span className='card-desc'>关注每日A股趋势</span></div>}
      >
        <AShares />
      </Card>
      <Card
        className='card-title'
        title={<div>美股小结<span className='card-desc'>掌握国际金融动向</span></div>}
      >

      </Card>
    </BasicLayout>
  );
};

export default News;
