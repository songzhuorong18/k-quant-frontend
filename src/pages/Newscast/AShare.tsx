import React from 'react';
import type { FormProps } from 'antd';
import { Button, Select, Form, Space, Flex, Divider } from 'antd';
import type { SelectProps } from 'antd';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

// TODO 选项数据从哪里获取
const options: SelectProps['options'] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

const AShares: React.FC = () => {
  return <Flex justify="space-between" align="stretch" gap={12}>
    <div style={{ width: '100%', background: '#f5f5f5', padding: '12px 24px' }}>
      <Form
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Flex gap={12}>
          <div style={{ flex: 1 }}>
            <span style={{ lineHeight: '30px', fontWeight: 500 }}>板块</span>
            <Form.Item<FieldType>
              label="领涨"
              name="username"
            // rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Select
                mode="multiple"
                maxTagCount={2}
                allowClear
                style={{ width: '100%' }}
                placeholder="请选择"
                options={options}
                optionRender={(option) => (
                  <Space>
                    <span>
                      {option.data.label}
                    </span>
                    热门
                  </Space>
                )}
              />
            </Form.Item>
            <Form.Item<FieldType>
              label="领跌"
              name="username"
            // rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Select
                mode="multiple"
                maxTagCount={2}
                allowClear
                style={{ width: '100%' }}
                placeholder="请选择"
                options={options}
              />
            </Form.Item>
          </div>
          <Divider type="vertical" dashed style={{ height: 'auto' }} />
          <div style={{ flex: 1 }}>
            <span style={{ lineHeight: '30px', fontWeight: 500 }}>概念</span>
            <Form.Item<FieldType>
              label="领涨"
              name="username"
            // rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Select
                mode="multiple"
                maxTagCount={2}
                allowClear
                style={{ width: '100%' }}
                placeholder="请选择"
                options={options}
              />
            </Form.Item>
            <Form.Item<FieldType>
              label="领跌"
              name="username"
            // rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Select
                mode="multiple"
                maxTagCount={2}
                allowClear
                style={{ width: '100%' }}
                placeholder="请选择"
                options={options}
              />
            </Form.Item>
          </div>
        </Flex>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
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

}

export default AShares;