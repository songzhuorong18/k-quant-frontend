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
            console.log("🚀 ~ getTodayNews ~ res:", res)
            setNews(res.data);
        } finally {
            setNewsLoading(false)
        }

    }

    async function init() {
        const res = await queryNewsMap();
        const newsMap = (res.data || []).map((value: string) => ({ value, label: value }))
        setNewsOptions(newsMap);
        const checked = newsMap.length > 3 ? newsMap.slice(0, 3) : newsMap;
        const values = (checked).map((item: any) => ({
            tag: item.value,
            num: 4,
        }))

        form.setFieldsValue({
            names: values
        })
        getTodayNews(values)
    }

    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
        getTodayNews(values.names)
    };

    useEffect(() => {
        init();
    }, []);

    return <Spin tip="Loading" size="small" spinning={newsLoading}>
        <Flex justify="space-between" align="flex-start" gap={12}>
            <div>
                {
                    (news || []).map(item =>
                        <li key={item}>
                            {item}
                        </li>
                    )
                }
            </div>
            <Card>
                <p>选择新闻类别</p>
                <Form
                    form={form}
                    style={{ minWidth: 260 }}
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
                                            name={[name, 'tag']}
                                            rules={[{ required: true, message: '请选择新闻类别' }]}
                                        >
                                            <Select placeholder="新闻类别" style={{ width: '140px' }} options={newsOptions} />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'num']}
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
                                                add({ tag: '', num: 4 });
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
