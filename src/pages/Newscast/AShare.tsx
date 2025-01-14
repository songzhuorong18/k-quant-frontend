import React, { useState, useEffect } from 'react';
import type { FormProps } from 'antd';
import { Button, Select, Form, Space, Flex, Divider, Spin, Tooltip } from 'antd';
import type { SelectProps } from 'antd';
import { queryAShareModules, queryAShareText } from '../../services/Newscast';

export type AShareFieldType = {
  selected_top_board?: string[];
  selected_bottom_board?: string[];
  selected_top_concepts?: string[];
  selected_bottom_concepts?: string[];
};

const AShares: React.FC = () => {
  const [form] = Form.useForm();

  const [disabled, setDisabled] = useState(true);

  function onValuesChange(changedValues: AShareFieldType, allValues: AShareFieldType) {
    const hasIndustry = allValues.selected_top_board?.length && allValues.selected_bottom_board?.length;
    const hasConcept = allValues.selected_top_concepts?.length && allValues.selected_bottom_concepts?.length;
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
      console.log('🚀 ~ getAShareModules ~ res:', res);
      const resData = res.data[0] || {};
      setText(resData.text1 || '');
      const keys = ['top_board', 'bottom_board', 'top_concepts', 'bottom_concepts'];
      let moduleOptions: any = {};
      keys.forEach(moduleKey => {
        const module = resData[moduleKey];
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


  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysis, setAnalysis] = useState('');

  async function getAnalysis(values: any) {
    setAnalysisLoading(true);
    try {
      const res = await queryAShareText(values)
      setAnalysis(res.data[0]?.text || '');
    } catch (error) {

    } finally {
      setAnalysisLoading(false);
    }
  }

  const onFinish: FormProps<AShareFieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    getAnalysis(values);
  };

  const onFinishFailed: FormProps<AShareFieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };



  useEffect(() => {
    getAShareModules();
  }, [])

  return <Spin spinning={loading}>
    <Flex vertical justify="space-between" align="stretch" gap={12} style={{ background: '#fff' }}>
      <div style={{ background: '#f5f5f5', padding: '8px 24px', fontWeight: 500 }}>{text}</div>
      <div style={{ width: '100%', background: '#f5f5f5', padding: '0 24px' }}>
        <div style={{ padding: '8px 0' }}>以下是今日A股领涨/领跌的板块和概念，请选择关注的板块/概念，一键生成市场分析报告。</div>
        <div style={{ fontSize: '16px', fontWeight: 500, padding: '8px 0' }}>TOP10 涨跌板块和概念</div>
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          onValuesChange={onValuesChange}
        >
          <Flex align="center" gap={18}>
            <div style={{ flex: 1 }}>
              <span style={{ lineHeight: '30px', fontWeight: 500 }}>板块(行业)</span>
              <Form.Item<AShareFieldType>
                label="领涨"
                name="selected_top_board"
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
              <Form.Item<AShareFieldType>
                label="领跌"
                name="selected_bottom_board"
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
            <Divider type="vertical" dashed style={{ height: '100px' }} />
            <div style={{ flex: 1 }}>
              <span style={{ lineHeight: '30px', fontWeight: 500 }}>概念</span>
              <Form.Item<AShareFieldType>
                label="领涨"
                name="selected_top_concepts"
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
              <Form.Item<AShareFieldType>
                label="领跌"
                name="selected_bottom_concepts"
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
            <Divider type="vertical" dashed style={{ height: '100px' }} />
            <Form.Item style={{ marginTop: '30px' }} label={null}>
              <Tooltip title={disabled ? '请选择领涨和领跌的板块/概念' : ''}>
                <Button type="primary" htmlType="submit" disabled={disabled}>
                  生成市场分析报告
                </Button>
              </Tooltip>

            </Form.Item>
          </Flex>
        </Form>
      </div>
      {
        analysis && (<div style={{ width: '100%', background: '#f5f5f5', padding: '24px' }}>
          <Spin spinning={analysisLoading} >
            <div dangerouslySetInnerHTML={{ __html: analysis }} ></div>
          </Spin>
        </div>)
      }
    </Flex>
  </Spin>
}

export default AShares;