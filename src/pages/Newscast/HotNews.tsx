import React, { useState, useEffect } from 'react';
import { Flex, Button, Card, Form, InputNumber, Space, Select, Spin } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { queryTodayNews, queryNewsMap } from '../../services/Newscast';

const HotNews: React.FC = () => {
    const [form] = Form.useForm();

    const [newsOptions, setNewsOptions] = useState<any[]>([])
    const [news, setNews] = useState<any[]>([]);
    const [newsLoading, setNewsLoading] = useState<boolean>(false)

    async function getTodayNews(params = {}) {
        setNewsLoading(true);
        try {
            const res = await queryTodayNews(params)
            setNews(res.data?.list);
        } finally {
            setNewsLoading(false)
        }

    }

    async function init() {
        const res = await queryNewsMap();
        setNewsOptions(res.data || []);
        const values = (res.data || []).map((item: any) => ({
            sort: item.value,
            count: 4,
        }))

        form.setFieldsValue({
            names: values
        })
        getTodayNews(values)
    }

    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
        getTodayNews(values)
    };

    useEffect(() => {
        init();
    }, []);

    return <Spin tip="Loading" size="small" spinning={newsLoading}>
        <Flex justify="space-between" align="flex-start" gap={12}>
            <div>
                {
                    (news || []).map(item =>
                        <li key={item.id}>
                            <span>【{newsOptions.find(option => option.value === item.type).label}】</span>
                            {item.title}
                        </li>
                    )
                }
            </div>
            <Card>
                <p>选择新闻类别</p>
                <Form
                    form={form}
                    name="dynamic_form_nest_item"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.List
                        name="names"
                        rules={[
                            {
                                validator: async (_, names) => {
                                    if (!names || names.length < 1) {
                                        return Promise.reject(new Error('请选择至少一个新闻类别'));
                                    }
                                },
                            },
                        ]}
                    >
                        {(fields, { add, remove }, { errors }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex' }} align="baseline">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'sort']}
                                            rules={[{ required: true, message: '请选择新闻类别' }]}
                                        >
                                            <Select placeholder="新闻类别" style={{ width: '140px' }} options={newsOptions} />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'count']}
                                            rules={[{ required: true, message: '请输入个数' }]}
                                        >
                                            <InputNumber placeholder="个数" min={1} max={10} />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                <Flex justify="space-between">
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => {
                                                add({ sort: 'demo', count: 4 });
                                            }}
                                            icon={<PlusOutlined />}
                                        >
                                            添加新闻类别
                                        </Button>
                                        <Form.ErrorList errors={errors} />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            预览
                                        </Button>
                                    </Form.Item>
                                </Flex>
                            </>
                        )}
                    </Form.List>
                </Form>
            </Card>
        </Flex>
    </Spin>

};

export default HotNews;
