import React from 'react'
import {Form, Input, Button, Row, Col, Icon } from 'antd'
import PropTypes from 'prop-types'
import {autobind} from 'core-decorators'
import {mapPropsToFields} from 'utils/form'
import createLanguage, { langPropTypes } from 'hoc/create-lang'


const FormItem = Form.Item

@Form.create({
    mapPropsToFields: mapPropsToFields
})
@createLanguage
@autobind
export default class StationTypeSearchForm extends React.PureComponent {
    static propTypes = {
        onSubmit: PropTypes.func,
        initialValues: PropTypes.object,
        onChangeSearch: PropTypes.func,
        lang: langPropTypes
    }

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    async componentWillMount() {

    }
    changeSearch(e){
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (err) return
            const data = {}
            if (values.key) data.key=values.key
            if (values.name) data.name=values.name
            // Callback submit form Container Component
            this.setState({ dataSearch: data},() => this.props.onChangeSearch(data))
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form
        const { lang: { t } } = this.props
        return (
            <Form
                className="ant-advanced-search-form"
                onSubmit={this.changeSearch}
            >
                <Row gutter={24}>
                    <Col span={10} key="key">
                        <FormItem label={t('stationTypeManager.form.key.label')}>
                            {getFieldDecorator(`key`)(
                                <Input placeholder={t('stationTypeManager.form.key.label')}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={10} key="name">
                        <FormItem label={t('stationTypeManager.form.name.label')}>
                            {getFieldDecorator(`name`)(
                                <Input placeholder={t('stationTypeManager.form.label.name')}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={4} style={{textAlign: 'right', marginTop: '42px'}}>
                        <Button type="primary" htmlType="submit"><Icon type="search"></Icon>{t('addon.search')}</Button>
                    </Col>
                </Row>
                <Row>

                </Row>
            </Form>
        )
    }
}
