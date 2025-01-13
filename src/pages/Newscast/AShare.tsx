import React, { useState, useEffect } from 'react';
import type { FormProps } from 'antd';
import { Button, Select, Form, Space, Flex, Divider, Spin } from 'antd';
import type { SelectProps } from 'antd';
import { queryAShareModules, queryAShareText } from '../../services/Newscast';

export type AShareFieldType = {
  top_board?: string[];
  bottom_board?: string[];
  top_concepts?: string[];
  bottom_concepts?: string[];
};


const onFinish: FormProps<AShareFieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
  queryAShareText(values)
};

const onFinishFailed: FormProps<AShareFieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const AShares: React.FC = () => {
  const [form] = Form.useForm();

  const [disabled, setDisabled] = useState(true);

  function onValuesChange(changedValues: AShareFieldType, allValues: AShareFieldType) {
    const hasIndustry = allValues.top_board?.length && allValues.bottom_board?.length;
    const hasConcept = allValues.top_concepts?.length && allValues.bottom_concepts?.length;
    setDisabled(!(hasIndustry || hasConcept))
  }

  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [options, setOptions] = useState({
    top_board: [],
    bottom_board: [],
    top_concepts: [],
    bottom_concepts: [],
  });

  async function getAShareModules() {
    setLoading(true);
    try {
      const res = await queryAShareModules();
      setText(res.data?.text1 || '');
      const keys = ['top_board', 'bottom_board', 'top_concepts', 'bottom_concepts'];
      let moduleOptions: any = {};
      keys.forEach(moduleKey => {
        const module = res.data[moduleKey];
        const options = Object.keys(module).map(key => ({ label: key, value: key, percent: module[key] }));
        moduleOptions[moduleKey] = options
      })
      setOptions(moduleOptions);
    } catch (error) {

    } finally {
      setLoading(false);
    }

  }

  function optionRender(option: any) {
    return (
      <Space>
        <span>
          {option.data.label}
        </span>
        {option.data.percent}
      </Space>
    )
  }



  useEffect(() => {
    getAShareModules();
  }, [])

  return <Spin spinning={loading}>
    <div style={{ background: '#f5f5f5', marginBottom: '12px', padding: '8px 24px' }}>{text}</div>
    <Flex justify="space-between" align="stretch" gap={12} style={{ background: '#fff' }}>
      <div style={{ width: '100%', background: '#f5f5f5', padding: '0 24px' }}>
        <div style={{ fontSize: '16px', fontWeight: 500, padding: '8px 0' }}>TOP10 涨跌板块和概念</div>
        <Form
          form={form}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          onValuesChange={onValuesChange}
        >
          <Flex gap={12}>
            <div style={{ flex: 1 }}>
              <span style={{ lineHeight: '30px', fontWeight: 500 }}>板块(行业)</span>
              <Form.Item<FieldType>
                label="领涨"
                name="top_board"
              >
                <Select
                  mode="multiple"
                  maxTagCount={2}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="请选择"
                  options={options.top_board}
                  optionRender={optionRender}
                />
              </Form.Item>
              <Form.Item<FieldType>
                label="领跌"
                name="bottom_board"
              // rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Select
                  mode="multiple"
                  maxTagCount={2}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="请选择"
                  options={options.bottom_board}
                  optionRender={optionRender}
                />
              </Form.Item>
            </div>
            <Divider type="vertical" dashed style={{ height: 'auto' }} />
            <div style={{ flex: 1 }}>
              <span style={{ lineHeight: '30px', fontWeight: 500 }}>概念</span>
              <Form.Item<FieldType>
                label="领涨"
                name="top_concepts"
              // rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Select
                  mode="multiple"
                  maxTagCount={2}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="请选择"
                  options={options.top_concepts}
                  optionRender={optionRender}
                />
              </Form.Item>
              <Form.Item<FieldType>
                label="领跌"
                name="bottom_concepts"
              // rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Select
                  mode="multiple"
                  maxTagCount={2}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="请选择"
                  options={options.bottom_concepts}
                  optionRender={optionRender}
                />
              </Form.Item>
            </div>
          </Flex>

          <Flex justify="flex-end">
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit" disabled={disabled}>
                生成市场分析报告
              </Button>
            </Form.Item>
          </Flex>

        </Form>
      </div>
      <div style={{ width: '100%', background: '#f5f5f5', padding: '24px' }}>
        觀止至收盘，上证指数收跌3.06%，为3267.19；创业板指收跌3.99%，为2175.57；中证
        500收跌 3.93%，为5750.25；
        中证1000收跌
        3.70%，为6030.49。两市成交额18321亿，较上个交易日放量1784亿。板块（行业）方面，仅互联网电商上涨，光伏设备、医疗服务、证券、保险领跌。
        概念方面，无概念上涨，科创次新股、BC电池、华为海思概念股、光刻机领跌。
      </div>
    </Flex>
  </Spin>
}

export default AShares;