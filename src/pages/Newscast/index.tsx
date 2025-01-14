import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Flex, Button, Card, Modal, Checkbox } from 'antd';
import BasicLayout from '../../layout/BasicLayout';
import './index.less';
import HotNews from './HotNews';
import RiseAndFall from './TapeAnalysis/RiseAndFall';
import OtherInfo from './TapeAnalysis/OtherInfo';
import PopularStocks from './PopularStocks';
import AShare from './AShare';
import { get_mgxj } from '../../services/Newscast';

import type { CheckboxProps } from 'antd';

const CheckboxGroup = Checkbox.Group;

const modules = {
  'hot': {
    label: '热点追击',
    desc: '为您提供自动化的每日重要新闻筛选',
  },
  'tape': {
    label: '大盘分析',
    desc: '把握市场整体脉络',
  },
  'stocks': {
    label: '热门股票及板块分析',
    desc: '跟踪热门股票和资金流动',
  },
  'AShare': {
    label: 'A股小结',
    desc: '关注每日A股趋势',
  },
  'USStock': {
    label: '美股小结',
    desc: '掌握国际金融动向',
  }
}

const plainOptions = Object.keys(modules).map(key => ({
  value: key,
  ...modules[key]
}))

const defaultCheckedList = ['hot'];


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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [checkedList, setCheckedList] = useState<string[]>(defaultCheckedList);

  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;

  const onChange = (list: string[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    setCheckedList(e.target.checked ? plainOptions.map(item => item.value) : []);
  };

  const [mgxj, setMgxj] = useState('');

  async function getUSStock() {
    const res = await get_mgxj();
    console.log("🚀 ~ getUSStock ~ res:", res)
    setMgxj(res.data[0].America)
  }

  useEffect(() => {
    getUSStock();
  }, [])

  return (
    <BasicLayout backgroundColor="#f5f5f5">
      <div>
        <Flex justify="space-between" align="center" className='news-header'>
          <div>
            <span className='greet'>{getGreeting()}</span>
            <span className='date'>{moment().format('YYYY/MM/DD')} </span>
          </div>
          <span className='title'>今日新闻播报</span>
          <Button type="primary" onClick={showModal}>导出金融日报</Button>
        </Flex>
      </div>
      <Card
        className='card-title'
        title={<div>{modules.hot.label}<span className='card-desc'>{modules.hot.desc}</span></div>}
        extra={<Button type="link">导出热点追击</Button>}
      >
        <HotNews />
      </Card>
      <Card
        className='card-title'
        title={<div>{modules.tape.label}<span className='card-desc'>{modules.tape.desc}</span></div>}
      >
        <Flex justify="space-between" align="stretch" gap={12} >
          <RiseAndFall />
          <OtherInfo />
        </Flex>

      </Card>
      <Card
        className='card-title'
        title={<div>{modules.stocks.label}<span className='card-desc'>{modules.stocks.desc}</span></div>}
      >
        <PopularStocks />
      </Card>
      <Card
        className='card-title'
        title={<div>{modules.AShare.label}<span className='card-desc'>{modules.AShare.desc}</span></div>}
      >
        <AShare />
      </Card>
      <Card
        className='card-title'
        title={<div>{modules.USStock.label}<span className='card-desc'>{modules.USStock.desc}</span></div>}
      >
        {mgxj}
      </Card>
      <Modal title="导出" width={600} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
          全部模块
        </Checkbox>
        {/* <Divider /> */}
        <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
      </Modal>
    </BasicLayout>
  );
};

export default News;
